import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpCacherService {

  server: boolean;
  store: any = null;

  constructor(
    private http: Http
  ) {
    this.server = typeof document === 'undefined';
  }

  watch(store) {
    if (this.store === null) {
      this.store = store;
    } else {
      console.error('Trying to set a store for the second time!');
    }
  }

  get(url) {


    let ret: Promise<any>;

    if (this.store === null) {
      console.error('cannot get because no store set');
      ret = Promise.reject('no store set');
      return ret;
    }

    const cache = this.store.getCache();

    // first check our cache to see if we've already made a request to this url
    const cached = cache.filter(item => {
      return item.url === url;
    })[0];

    // if we have, and we're either under our limit *or* running on the server
    if (cached && (cached.uses > cached.used || this.server)) {

      // return the cached value
      ret = Promise.resolve(cached.data);
      // if we're on the server, increment our uses, otherwise, increment our used
      if (this.server) {
        cached.uses++;

        this.store.setCache(JSON.stringify(cache));
      } else {
        cached.used++;

      }
    } else {

      // otherwise, we need to actually do the fetch
      ret = this.http.get(url).toPromise();
      // assume the data is json
      ret = ret.then(response => {
        return Promise.resolve(response.json());
      });
      // if we're on the server, add it to the cache
      if (this.server) {
        ret.then(data => {
          cache.push({
            url: url,
            data: data,
            uses: 1,
            used: 0
          });

          // update the element that's watching the cache
          this.store.setCache(cache);
        });
      }
    }

    return ret;
  }

}
