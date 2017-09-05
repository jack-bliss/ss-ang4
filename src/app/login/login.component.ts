import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    public currentUser: CurrentUserService
  ) { }

  ngOnInit() {
  }

  logIn(){
    console.log(this.username, this.password);
    this.currentUser.logIn(this.username);
  }

}
