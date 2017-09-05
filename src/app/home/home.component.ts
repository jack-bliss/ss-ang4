import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bands: any[];

  constructor(
    private http: Http
  ) {

  }

  ngOnInit() {
    this.http.get( 'http://localhost:4000/api/bands')
      .toPromise()
      .then(response => {
        this.bands = response.json();
      });
  }

}
