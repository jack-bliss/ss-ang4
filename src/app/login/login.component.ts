import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    public currentUser: CurrentUserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logIn(){
    console.log(this.username, this.password);
    this.currentUser.logIn(this.username);
    this.router.navigate(['/']);
  }

}
