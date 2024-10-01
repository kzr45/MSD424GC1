import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  leaveRequest = {
    startDate: '',
    endDate: '',
    reason: ''
  };

  leaveRequests: Array<any> = [];

  constructor(private alertController: AlertController) {}

  async submitLeaveRequest() {
    // Validate if the fields are filled
    if (!this.leaveRequest.startDate || !this.leaveRequest.endDate || !this.leaveRequest.reason) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please fill in all fields before submitting.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Add the leave request to the local array
    this.leaveRequests.push({ ...this.leaveRequest });

    // Clear the form
    this.leaveRequest = { startDate: '', endDate: '', reason: '' };

    // Success alert
    const alert = await this.alertController.create({
      header: 'Leave Request Submitted',
      message: 'Your leave request has been submitted successfully!',
      buttons: ['OK']
    });
    await alert.present();
  }
}
