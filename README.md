# Binary Semaphore: a mutex lock to run on Heroku

This simple Node server offers an infinite set of mutexes via HTTP API.

You acquire a lock by `PUT` request to `/lock/:id/:nonce`.

There `id` is the lock's identifier, and `nonce` is a random string you choose which is used to prevent certain conflicts.

You release the lock by `DELETE` to that same path.

All acquired locks expire automatically in a hard-coded number of seconds.

That should probably be configurable.

CORS is allowed for any domain origin.

We use this in [https://github.com/mbrock/telegroam](Telegroam).

It's useful e.g. if you have several browser scripts that need to
use some resource without conflicting with each other.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Note that you also need to enable Heroku Redis (the hobby free plan)
on the created application.
