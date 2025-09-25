import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser, IResponse } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  get pageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  arrUsers: IUser[] = [];
  usersServices = inject(UsersService);

  currentPage: number = 1;
  totalPages: number = 2;
  //Estoy mostrando 8 usuarios por página
  usersPerPage: number = 8;

  async ngOnInit() {
    try {
      //Una respuesta por página
      const responsePage1: IResponse = await this.usersServices.getAllWithPage(1);
      const responsePage2: IResponse = await this.usersServices.getAllWithPage(2);
      //Un array con el listado de todos los usuarios
      this.arrUsers = [...responsePage1.results, ...responsePage2.results];
      //calcula el número total de páginas necesarias para mostrar todos los usuarios en una lista paginada
      this.totalPages = Math.ceil(this.arrUsers.length / this.usersPerPage);
    } catch (msg: any) {
      alert(msg.error?.error || 'Error loading users');
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get paginatedUsers(): IUser[] {
    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.arrUsers.slice(start, start + this.usersPerPage);
  }

  async eventDeleteUser(id: string): Promise<void> {
    await this.usersServices.deleteUserWithConfirmation(id, () => {
      this.arrUsers = this.arrUsers.filter(user => user._id !== id);
      this.totalPages = Math.ceil(this.arrUsers.length / this.usersPerPage);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    });
  }
}
