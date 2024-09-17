import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service'; 
import { Users } from '../service/user-info.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {


  constructor(private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit() {

  }
}
