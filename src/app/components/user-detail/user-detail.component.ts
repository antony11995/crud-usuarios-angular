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
      console.error('Error obteniendo lista de usuarios:', error);
    }
  }

  async eventDeleteUser(id: string): Promise<void> {
    await this.usersService.deleteUserWithConfirmation(id, () => {
      this.router.navigate(['/home']);
    });
  }
}
