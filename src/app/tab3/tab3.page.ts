import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  datetime: string ='';

  constructor() {
    this.updatedatetime();
  }

  updatedatetime() {
    const today = new Date();
    this.datetime = today.toDateString();
  }
}
