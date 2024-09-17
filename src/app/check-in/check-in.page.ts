import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {
  currentPosition: Position | undefined; // Current position information
  currentTime: string | undefined; // Current time
  lastCheckInTime: Date | undefined; // Last check-in time
  lastCheckOutTime: Date | undefined; // Last check-out time
  checkInRecords: { time: string, companyName: string, checkIn: boolean, remark?: string }[] = []; // Check-in records
  companyLatitude: number = -27.9705699; // Company latitude
  companyLongitude: number = 153.4134075; // Company longitude
  companyRange: number = 40000000; // Company range radius
  companyName: string = ''; // Company name
  isCheckingIn: boolean = false; // Whether checking in

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private geolocation: Geolocation
  ) { }

  // Perform the check-in operation
  async checkIn() {
    this.isCheckingIn = true; // Set the checking-in flag to true
    await this.getCurrentPosition(); // Get current position information
    const time = new Date().toLocaleString(); // Get current time

    // Check if within the company range
    if (!this.isWithinCompanyRange(this.currentPosition)) {
      const alert = await this.alertController.create({
        header: 'Check-In Error',
        message: 'You are not within company range. Cannot check in.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Check if already checked in
    if (this.lastCheckInTime && (!this.lastCheckOutTime || this.lastCheckInTime > this.lastCheckOutTime)) {
      const alert = await this.alertController.create({
        header: 'Check-In Error',
        message: 'You have already checked in. Cannot check in again.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Check if checking in before checking out
    if (this.lastCheckInTime && (!this.lastCheckOutTime || this.lastCheckInTime.getTime() > this.lastCheckOutTime.getTime())) {
      const alert = await this.alertController.create({
        header: 'Check-In Error',
        message: 'You cannot check in before checking out.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Record check-in time
    this.lastCheckInTime = new Date();

    const alert = await this.alertController.create({
      header: 'Check-In Successful',
      message: 'You have successfully checked in.',
      buttons: ['OK']
    });

    await alert.present(); // Display the alert
    await this.addRemark(); // Add remark information
  }

  // Perform the check-out operation
  async checkOut() {
    this.isCheckingIn = false; // Set the checking-in flag to false
    if (!this.isWithinCompanyRange(this.currentPosition)) {
      const alert = await this.alertController.create({
        header: 'Check-Out Error',
        message: 'You are not within company range. Cannot check',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.lastCheckInTime) {
      const alert = await this.alertController.create({
        header: 'Check-Out Error',
        message: 'You have not checked in yet. Cannot check out before checking in.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    await this.getCurrentPosition(); // Get current location information
    const time = new Date().toLocaleString(); // Get current time

    // Check if already checked out
    if (this.lastCheckOutTime && this.lastCheckInTime && this.lastCheckOutTime.getTime() > this.lastCheckInTime.getTime()) {
      const alert = await this.alertController.create({
        header: 'Check-Out Error',
        message: 'You have already checked out. Cannot check out again.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.lastCheckOutTime = new Date(); // Record check-out time

    const alert = await this.alertController.create({
      header: 'Check-Out Successful',
      message: 'You have successfully checked out.',
      buttons: ['OK']
    });

    await this.addRemark(); // Add remark information
    await alert.present(); // Display the alert box
  }

  // Add remark information
  async addRemark() {
    const alert = await this.alertController.create({
      header: 'Add Remark',
      inputs: [
        {
          name: 'remark',
          type: 'text',
          placeholder: 'Enter your remark...'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: (data) => {
            this.handleRemark(data.remark); // Process remark information
          }
        }
      ]
    });

    await alert.present(); // Display the add remark dialog
  }

  // Get current location information
  async getCurrentPosition() {
    try {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.currentPosition = await Geolocation.getCurrentPosition(options); // Get current location information
      console.log('Current position:', this.currentPosition);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  // Get current time
  getCurrentTime() {
    const date = new Date();
    this.currentTime = date.toLocaleString();
  }

  // Check if it is within the company scope
  isWithinCompanyRange(position: Position | undefined): boolean {
    if (!position) return false;

    const employeeLatitude = position.coords.latitude;
    const employeeLongitude = position.coords.longitude;

    // Calculate distance
    const earthRadius = 6371e3;
    const φ1 = this.companyLatitude * Math.PI / 180; // Company latitude in radians
    const φ2 = employeeLatitude * Math.PI / 180; // Employee latitude in radians
    const Δφ = (employeeLatitude - this.companyLatitude) * Math.PI / 180; // Difference in latitude in radians
    const Δλ = (employeeLongitude - this.companyLongitude) * Math.PI / 180; // Difference in longitude in radians

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance calculation

    this.companyName = distance <= this.companyRange ? 'Company' : ''; // Set company name

    return distance <= this.companyRange; // Return whether it's within the company's range
  }

  // Handle remark information
  async handleRemark(remark: string) {
    const time = new Date().toLocaleString(); // Get current time
    await this.getCurrentPosition(); // Get current location information

    // Check if current location is within company range, set company name
    const withinCompanyRange = this.isWithinCompanyRange(this.currentPosition);

    this.companyName = withinCompanyRange ? 'Company' : '';

    const record = {
      time: time,
      companyName: this.companyName,
      checkIn: this.isCheckingIn,
      remark: remark.trim() !== '' ? remark.trim() : 'No Remark', // Set remark information
    };
    this.checkInRecords.push(record); // Add record to check-in records array
  }

}
