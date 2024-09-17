import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { Users } from '../service/user-info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  userList: Users[] = [];

  constructor(private userService: UserService, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.userList = this.userService.getUsers(); // Get user list
  }

  openChat(userId: number) {
    // Navigate to chat page using user's ID
    this.router.navigate(['/chat', userId]);
  }
}
