import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: AppService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.dataService.getUserById(this.userId).subscribe((data) => {
      this.userForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dataService.updateUser(this.userId, this.userForm.value).subscribe(
        () => {
          this.router.navigate(["/users"]);
        }
      );
    }
  }
}
