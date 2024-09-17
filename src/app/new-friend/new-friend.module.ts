import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewFriendPageRoutingModule } from './new-friend-routing.module';
import { NewFriendPage } from './new-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewFriendPageRoutingModule
  ],
  declarations: [NewFriendPage]
})
export class NewFriendPageModule {}
