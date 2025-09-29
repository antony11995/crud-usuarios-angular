import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEdit = false;
  userId = '';
  title = 'Nuevo Usuario';
  buttonText = 'Guardar';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', [Validators.required, Validators.pattern(/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i)]]
    });

    this.activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {
        this.isEdit = true;
        this.userId = params['id'];
        this.title = 'Actualizar Usuario';
        this.buttonText = 'Actualizar';
        const user = await this.usersService.getById(this.userId);
        this.userForm.patchValue(user);
      }
    });
  }

  get f() {
    return this.userForm.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      try {
        if (this.isEdit) {
          const updatedUser = await this.usersService.updateUser(this.userId, this.userForm.value as IUser);
          if (updatedUser) {
            swal('¡Actualizado!', 'La información del usuario ha sido actualizada', 'success');
            this.router.navigate(['/user', this.userId]);
          } else {
            swal('Error', 'Información no actualizada', 'error');
          }
        } else {          
          const newUser = await this.usersService.createUser(this.userForm.value as IUser);
          if (newUser){
          swal('¡Creado!', 'Se ha creado el usuario', 'success');
          console.log('Usuario creado:', newUser);
          this.router.navigate(['/home']);
          }else{
            swal('Error', 'No se ha podido crear el usuario', 'error');
          }
        }
      } catch (error) {
        console.error('Error al guardar usuario:', error);
        swal('Error', 'Información no actualizada', 'error');
      }
    } else {
      console.log('Formulario no válido');
      this.userForm.markAllAsTouched();
    }
  }
}
