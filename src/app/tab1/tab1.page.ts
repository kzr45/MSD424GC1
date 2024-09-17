import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CheckInPage } from '../check-in/check-in.page'; // Import CheckInPage

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private navCtrl: NavController) { }

  goToCheckInPage() {
    this.navCtrl.navigateForward('/check-in'); // Navigate to CheckInPage
  }
}
