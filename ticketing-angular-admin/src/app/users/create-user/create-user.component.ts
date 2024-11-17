import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: AppService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dataService.createUser(this.userForm.value).subscribe({
        next: () => alert('User created successfully!'),
        error: (err) => console.error(err),
      });
    }
  }}
