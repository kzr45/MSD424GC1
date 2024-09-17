import { Injectable } from '@angular/core';
import { Users } from './user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: Users[] = [
  ];

  constructor() { }

  getUsers(): Users[] {
    return this.userList;
  }


}
