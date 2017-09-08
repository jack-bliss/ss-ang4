import { Injectable } from '@angular/core';

@Injectable()
export class StringManipService {

  constructor() { }

  static urlify(string: string){
    return string.replace(/\s/g, '-').replace(/[^a-zA-Z\-]/g, '').toLowerCase();
  }

}
