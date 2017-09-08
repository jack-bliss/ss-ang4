import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { StringManipService } from '../services/string-manip.service';
import { AsyncCacherService } from '../services/async-cacher.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  bands: any[];

  constructor(
    private http: Http,
    private async: AsyncCacherService
  ) {

  }

  ngOnInit() {
    this.async.get('http://localhost:4000/api/bands').then(bands => {
      this.bands = bands.map(band => {
        band.route = StringManipService.urlify(band.name);
        return band;
      });
    });
  }

}
