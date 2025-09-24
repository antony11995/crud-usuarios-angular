import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulario enviado:', this.userForm.value);
      // Here you would typically send the data to a service
    } else {
      console.log('Formulario no válido');
      this.userForm.markAllAsTouched();
    }
  }
}
