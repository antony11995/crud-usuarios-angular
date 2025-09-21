import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { IResponse } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endPoint: string = "https://peticiones.online/api/users";
  private httpClient = inject(HttpClient);

  getAll(): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(this.endPoint));
  }

  getAllWithPage(page: number): Promise<IResponse> {
    const url = `${this.endPoint}?page=${page}`;
    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }
}
