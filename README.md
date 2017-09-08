# Server Side Angular

Have a look at `src/app/services/async-cacher` and `src/app/async-data-store`. These two files together are responsible for preventing the flashing content.

When the app is running on the server, all requests through async-cacher are stored in async-data-store's cache, which is rendered to the dom each time.

When the app is running on the client, it first checks to see if #async-data-store exists, and if it does, parse its contents into the cache.

Then, whenever a request through async-cacher is made, it first checks the contents of the cache. Additionally, requests made when the app is running on the server will also first check the cache to improve performance for API requests made to the same and point.

The cache tracks how many times each end point was used during server-side bootstrapping. This ensures that future calls made during the app's client-side run time do not hit the cache.

All of this is a series of heuristics, and it involevs directly quierying the DOM during client-side bootstrapping, which I'd expect many people to be uncomfortable with, but it works.
