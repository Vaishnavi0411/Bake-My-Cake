import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(user: any) {
    return this.httpClient.post("http://localhost:3000/users", user);
  }
  checkIfUserExist(email: string) {
    return this.httpClient.get<User[]>("http://localhost:3000/users?email=" + email);
  }
  checkUsernameAndPassword(email: string, password: string) {
    return this.httpClient.get<User[]>("http://localhost:3000/users?email=" + email + "&password=" + password);
  }
}
