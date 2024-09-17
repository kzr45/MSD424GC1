import { Component, OnInit } from '@angular/core';
import { Users } from '../../service/user-info.model';
import { AuthService } from "../../service/auth.service";
import { NotificationService } from "../../service/notification.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {
  user: Users;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {
    this.user = new Users();
  }

  ngOnInit() {
  }

  // Method to register a new user
  register() {
    // Set the role ID based on whether the user is an admin
    this.user.roleid = this.isAdmin ? '1' : '2';

    console.dir(this.user);

    // Call the registerUser method in AuthService to perform the registration
    this.authService.registerUser(this.user)
      .then((response: any) => {
        if (response.insert === "success") {
          // If registration is successful, display a success notification and navigate to the home page or another page
          this.notificationService.showSuccessNotification('Registration successful');
          this.router.navigate(['/tabs/tab1']);
        } else {
          // If the backend does not return the expected success identifier, display an error notification
          this.notificationService.showErrorNotification('Registration failed, please try again');
        }
      })
      .catch((error) => {
        // Display an error notification when an error is caught
        console.error("Registration error:", error);
        this.notificationService.showErrorNotification('An error occurred during the registration process');
      });
  }

}
