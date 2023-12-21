import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = { email: '', password: '' };

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  login() {
    this.userService.checkUsernameAndPassword(this.user.email, this.user.password).subscribe(
      (data) => {
        if (data.length === 1) {
          this.loginService.canLogin(data);
          this.router.navigateByUrl("home");
          this.openSnackBar('Login Success');
        } else {
          this.userService.checkIfUserExist(this.user.email).subscribe(
            (userData) => {
              if (userData.length === 1) {
                this.openSnackBar('Password incorrect');
              } else {
                this.openSnackBar('Not a registered user');
              }
            }
          );
        }
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
