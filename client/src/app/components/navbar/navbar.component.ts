import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,  OnDestroy {
  userID: { id: string, token: string } | null = null;
  userData: User | null = null;
  showDropDown: boolean = false;
  randomColor!:string;
  userInitials: string | null = null;

  private userSubscription: Subscription | undefined;

  constructor(private _service: UserService) { }

  ngOnInit(): void {
    console.log("working")
    this.userID = this._service.getUserToken();
  
    if (this.userID) {
      // Get user data and subscribe to changes
      this._service.getUserData(this.userID.id);
      this.userSubscription = this._service.getUserDataObserver().subscribe(
        (userData: User | null) => {
          this.userData = userData;
          this.userInitials = this.getUserInitials(); 
          this.getRandomColor()
        }
      );
    } else {
      // If no user ID is found, set user initials to null
      this.userInitials = null;
    }
  }



  getUserInitials(): string {
    const initials = this.userData?.name?.split(' ').map(name => name.charAt(0)).join('');
    return initials ? initials.toUpperCase() : '';
  }

  getRandomColor() {
    const colors = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#a1887f', '#90a4ae'];
    this.randomColor = colors[Math.floor(Math.random() * colors.length)];
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  dropDownAction(): void {
    this.showDropDown = !this.showDropDown;
    // Change button color when clicked
  }
}
