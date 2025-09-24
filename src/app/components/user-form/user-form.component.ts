import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', [Validators.required, Validators.pattern(/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i)]]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      try {
        const newUser = await this.usersService.createUser(this.userForm.value as IUser);
        console.log('Usuario creado:', newUser);
        //this.router.navigate(['/users']); // Navigate to the user list after creation
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    } else {
      console.log('Formulario no válido');
      this.userForm.markAllAsTouched();
    }
  }
}
