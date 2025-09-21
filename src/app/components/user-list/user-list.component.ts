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
  arrUsers: IUser[] = []
  usersServices = inject(UsersService)

  async ngOnInit() {
    //lleno el array de usuarios llamando al servicio y pidiendo todos los usuarios getAll.
    try {
        const response: IResponse = await this.usersServices.getAll()
        console.log(response)
        this.arrUsers = response.results
    }
    catch (msg: any) {
      alert(msg.error.error)
    }
  }
  deleteUser(id: number) {

  }
}
