import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 导入 Router

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  user = {
    name: 'John Doe',
    age: 25,
    gender: 'Male'
  };

  isEditable = false;  

  constructor(private router: Router) { }

  updateProfile() {
    console.log('Updated Profile:', this.user);
    this.isEditable = false;  
  }

  enableEditing() {
    this.isEditable = true; 
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister() {
    this.router.navigate(['/regist']); // 根据你的路由配置导航到注册页面
  }
}
