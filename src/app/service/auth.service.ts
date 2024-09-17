import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Users } from "./user-info.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: Users | null = null;

  constructor(private http: HttpClient, private config: ConfigService) { }

  // URL for updating user information
  private updateUserUrl = this.config.BASE_URL + "/api1/updateUser";

  // URL for user login
  private loginUrl = this.config.BASE_URL + "/api1/login";

  // Update user information
  updateUser(user: Users) {
    return this.http.put(this.updateUserUrl, user).toPromise();
  }

  // User login
  login(email: string, password: string) {
    let params = {
      "email": email,
      "password": password
    };
    return this.http.post(this.loginUrl, params).toPromise().then((user: any) => {
      this.currentUser = user;
      return user;
    });
  }

  //get user information to "My profile" page
  getCurrentUser(): Users | null {
    return this.currentUser;
  }

  // Register a new user
  registerUser(user: Users) {
    const registerUserUrl = this.config.getRegisterUserUrl();
    return this.http.post(registerUserUrl, user).toPromise();
  }
}
