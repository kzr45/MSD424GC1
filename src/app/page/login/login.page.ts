import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'; 
import { NotificationService } from "../../service/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService,) { } // Use AuthService

  // Handle user login
  login() {
    // Build the login data object
    const loginData = {
      email: this.email,
      password: this.password
    };

    // Call the login method in AuthService to perform login
    this.authService.login(loginData.email, loginData.password)
      .then((response: any) => {
        if (response.login === "success") {
          // If login is successful, display a success notification and navigate to the home page or another page
          this.notificationService.showSuccessNotification('Login successful');
          this.router.navigate(['/tabs/tab1']);
        } else {
          // If the backend does not return the expected success flag, display an error notification
          this.notificationService.showErrorNotification('Login failed, please try again');
        }
      })
      .catch((error) => {
        // Display an error notification when an error is caught
        console.error("Login error:", error);
        this.notificationService.showErrorNotification('An error occurred during the login process');
      });
  }

  // Navigate to the registration page
  register() {
    this.router.navigate(['/regist']);
  }
}
