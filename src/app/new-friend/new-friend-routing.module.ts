import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewFriendPage } from './new-friend.page';

const routes: Routes = [
  {
    path: '',
    component: NewFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewFriendPageRoutingModule {}
