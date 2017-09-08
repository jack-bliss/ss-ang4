import { Component, OnInit } from '@angular/core';

import { AsyncCacherService } from '../services/async-cacher.service';

let cheekyCache;
if (typeof document !== 'undefined') {
  cheekyCache = [];
  const store = document.getElementById('async-data-store');
  if (store && store.innerHTML) {
    cheekyCache = JSON.parse(store.innerHTML);
  }
}

@Component({
  selector: 'app-async-data-store',
  template: `
    <div style="
      display: none !important;
      height: 0 !important;
      width: 0 !important;
      overflow: hidden !important;
    " id="async-data-store">
      {{cacheString}}
    </div>`
})
export class AsyncDataStoreComponent implements OnInit {

  constructor(
    private async: AsyncCacherService
  ) {

  }

  cache: object[];
  cacheString: string;

  ngOnInit() {
    this.async.watch(this);
    if (this.async.server) {
      this.setCache([]);
    } else {
      this.setCache(cheekyCache);
    }
  }

  setCache(cache) {
    this.cache = cache;
    this.cacheString = JSON.stringify(cache);
  }

  getCache() {
    return this.cache;
  }

}
