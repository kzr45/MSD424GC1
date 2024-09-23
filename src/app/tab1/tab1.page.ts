import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isCheckedIn: boolean = false; // Track check-in status

  constructor(private navCtrl: NavController) {}

  goToCheckInPage() {
    this.navCtrl.navigateForward('/check-in'); // Navigate to Check-In page
  }

  toggleCheckIn() {
    // Get the button element and cast it to HTMLButtonElement
    const button = document.getElementById('checkInButton') as HTMLButtonElement;

    if (button) {
      button.disabled = true; // Disable button to prevent multiple clicks
    }

    setTimeout(() => {
      this.isCheckedIn = !this.isCheckedIn; // Toggle check-in status

      if (button) {
        button.disabled = false; // Re-enable the button after the delay
      }
    }, 1000); // Delay in milliseconds (1000ms = 1 second)
  }
}
