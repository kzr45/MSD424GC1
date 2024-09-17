import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NewFriendPage } from './new-friend.page';

describe('NewFriendPage', () => {
  let component: NewFriendPage;
  let fixture: ComponentFixture<NewFriendPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewFriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
