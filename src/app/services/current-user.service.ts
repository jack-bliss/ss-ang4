import { Injectable } from '@angular/core';

let loggedIn = false;
let user = {
  name: ''
};

@Injectable()
export class CurrentUserService {

  constructor() { }

  loggedIn(){
    return loggedIn;
  }

  logIn(username){
    user.name = username;
    loggedIn = true;
    return user;
  }

}
