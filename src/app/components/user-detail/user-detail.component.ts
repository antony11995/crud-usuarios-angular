import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  router = inject(Router);

  user: IUser | undefined;

  async ngOnInit(): Promise<void> {
    try {
      const userId = this.activatedRoute.snapshot.params['id'];
      this.user = await this.usersService.getById(userId);
    } catch (error) {
      console.error('Error fetching user:', error);
      // You could handle the error here, e.g., show a message or redirect
    }
  }

  async eventDeleteUser(id: string): Promise<void> {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        const response = await this.usersService.deleteUser(id);
        console.log(response);
        alert('Usuario eliminado correctamente');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Ha ocurrido un error al eliminar el usuario');
      }
    }
  }
}
