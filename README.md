# Binary Semaphore: a mutex lock to run on Glitch

This simple Node server offers an infinite set of mutexes via HTTP API.

You acquire a lock by `PUT` request to `/lock/:id/:nonce`.

There `id` is the lock's identifier, and `nonce` is a random string you choose which is used to prevent certain conflicts.

You release the lock by `DELETE` to that same path.

All acquired locks expire automatically in a hard-coded number of seconds.

That should probably be configurable.

CORS is allowed for any domain origin.

We use this in [https://github.com/mbrock/telegroam](Telegroam).

It's useful e.g. if you have several browser scripts that need to use some resource without conflicting with each other.

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button-v2.svg)](https://glitch.com/edit/#!/remix/binary-semaphore)

To run this on Glitch you'll need to configure a Redis instance somewhere you can connect to. Redis offers a free tier that should be sufficient for many purposes here.

Navigate to <https://redis.com/try-free/>, sign up, and allow Redis to create your default database. Once created, click on "Connect" and copy the Redis url (ask Redis to replace username and password for you) and add that value in your `.env` file.
