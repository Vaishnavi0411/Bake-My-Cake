import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  isAdminLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;
  userName: string = "";
  role: string = "";
  email: string = "";

  constructor() { }

  canLogin(data: any) {
    if (data[0].role == "user") {
      this.isUserLoggedIn = true;
    }
    else {
      this.isAdminLoggedIn = true;
    }
    this.userName = data[0].userName;
    this.role = data[0].role;
    this.email = data[0].email;
  }

  canLogout() {
    this.isAdminLoggedIn = false
    this.isUserLoggedIn = false
    this.userName = ""
    this.role = ""
    this.email = ""
  }
}
