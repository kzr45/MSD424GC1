import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  
  BASE_URL = 'https://24091826.it.scu.edu.au';



  constructor() { }

  
  getRegisterUserUrl(): string {
    return `${this.BASE_URL}/api1/regist`;
  }
}
