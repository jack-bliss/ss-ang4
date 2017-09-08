import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { StringManipService } from '../services/string-manip.service';
import { AsyncCacherService } from '../services/async-cacher.service';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css']
})
export class BandDetailComponent implements OnInit {

  band: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private async: AsyncCacherService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {

      const band_name = params['band'];

      this.async.get( 'http://localhost:4000/api/band/' + band_name)
        .then(bands => {
          this.band = bands.filter(band => {
            return StringManipService.urlify(band.name) === StringManipService.urlify(band_name);
          })[0];
        });
    });
  }

}
