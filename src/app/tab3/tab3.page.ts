import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  datetime: string = '';
  fromDate: string | null = null; // Store "From" date
  toDate: string | null = null;   // Store "To" date
  totalDays: number = 0;          // Store total days between "From" and "To"

  isSelectingFrom: boolean = false; // Track if user is selecting "From" date
  isSelectingTo: boolean = false;   // Track if user is selecting "To" date

  constructor(private alertController: AlertController) {}

  // Function to update current date (Not necessary for the new logic)
  updatedatetime() {
    const today = new Date();
    this.datetime = today.toDateString();
  }

  // Function to handle "From" date selection
  selectFromDate() {
    this.isSelectingFrom = true;
    this.isSelectingTo = false;
  }

  // Function to handle "To" date selection
  selectToDate() {
    this.isSelectingFrom = false;
    this.isSelectingTo = true;
  }

  // Function triggered when a date is selected in the calendar
  onDateSelected(event: any) {
    const selectedDate = new Date(event.detail.value).toDateString();

    if (this.isSelectingFrom) {
      this.fromDate = selectedDate; // Set "From" date
      this.isSelectingFrom = false;
    } else if (this.isSelectingTo) {
      this.toDate = selectedDate;   // Set "To" date
      this.isSelectingTo = false;
    }

    // If both "From" and "To" dates are selected, calculate the total days
    if (this.fromDate && this.toDate) {
      this.calculateTotalDays();
    }
  }

  // Function to calculate the total days between "From" and "To" dates
  calculateTotalDays() {
    const from = new Date(this.fromDate!);
    const to = new Date(this.toDate!);

    // Calculate the difference in milliseconds and convert to days
    const timeDiff = to.getTime() - from.getTime();
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  // Function to handle the "Book Now" button click
  async bookHoliday() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Booked  Successfully!!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
