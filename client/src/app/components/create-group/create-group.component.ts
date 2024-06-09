import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/service/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit, OnDestroy {
  allUsers: User[] = [];
  groupForm: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private fb: FormBuilder, public dialogRef: MatDialogRef<CreateGroupComponent>) {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      selectedUsers: [[]]
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.subscription.add(
      this.userService.getAllusers().subscribe((users) => {
        this.allUsers = users;
      })
    );
  }

  toggleUserSelection(userId: string): void {
    const selectedUsers = this.groupForm.get('selectedUsers') as FormControl;
    let updatedSelectedUsers = selectedUsers.value;

    if (updatedSelectedUsers.includes(userId)) {
      updatedSelectedUsers = updatedSelectedUsers.filter((id: string) => id !== userId);
    } else {
      updatedSelectedUsers.push(userId);
    }
    selectedUsers.setValue(updatedSelectedUsers);
  }

  onSubmit(): void {
    if (this.groupForm.invalid) {
      
    }
    this.dialogRef.close()
    this.groupForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
