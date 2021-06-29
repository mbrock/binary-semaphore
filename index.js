let express = require("express")
let Redis = require("ioredis")

const PORT = process.env.PORT || 5000

let redis = new Redis(process.env.REDIS_URL)

redis.defineCommand("dellock", {
  numberOfKeys: 1,
  lua: `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del",KEYS[1])
    else
      return 0
    end
  `
})

express()
  .post("/lock/:id/:nonce", async (req, res) => {
    let result =
      await redis.set(req.params.id, req.params.nonce, "NX", "EX", 120)

    if (result === "OK") {
      res.writeHead(200)
      res.end("lock acquired; expiring in 120s")
    } else {
      res.writeHead(423)
      res.end("lock already acquired")
    }
  })
  .delete("/lock/:id/:nonce", async (req, res) => {
    let result =
      await redis.dellock(req.params.id, req.params.nonce)

    if (result === 1) {
      res.writeHead(200)
      res.end("lock released")
    } else {
      res.writeHead(409)
      res.end("lock nonce mismatch")
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))