import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccessNotification(message: string) {
    alert("Success: " + message); 
  }

  showErrorNotification(message: string) {
    alert("Error: " + message);
  }
}
