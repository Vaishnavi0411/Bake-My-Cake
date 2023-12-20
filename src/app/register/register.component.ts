import { Component } from '@angular/core';
import { User } from '../model/user';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { CanComponentDeactivate } from '../services/cake.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements CanComponentDeactivate{

  constructor(private formbuilder: FormBuilder, private userserv: UserService,private snackBar: MatSnackBar ) { }

  ngOnInit(): void {}

  title: string = "Registration Form";
  passwordPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  registerForm = this.formbuilder.group({
    userName: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    confirmPassword:['',  [Validators.required, Validators.pattern(this.passwordPattern)]],
    gender:[''],
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
    phone: ['', [Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
    role: ['user'],
    address:this.formbuilder.group({
      street:[''],
      city:[''],
      state:[''],
      zipCode:['', [Validators.required,Validators.pattern("[0-9]{6}")]]
    })
  }, { validators: this.passwordCheck })

  passwordCheck(ac: AbstractControl) {
    let pass = ac.get('password')?.value;
    let conpass = ac.get('confirmPassword')?.value;
    if (pass === conpass) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  get userName() {
    return this.registerForm.get("userName");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get confirmPassword()
  {
    return this.registerForm.get("confirmPassword");
  }
  
  get gender()
  {
    return this.registerForm.get("gender");
  }

  get email() {
    return this.registerForm.get("email");
  }
  get phone() {
    return this.registerForm.get("phone");
  }

  get street()
  {
    return this.registerForm.get("address.street");
  }

  get city()
  {
    return this.registerForm.get("address.city");
  }
  
  get state()
  {
    return this.registerForm.get("address.state");
  }

  get zipCode()
  {
    return this.registerForm.get("address.zipCode");
  }

  saveUser() {
    let userEmail = this.registerForm.get("email")?.value?.toString();
    if (userEmail) {
      this.userserv.checkIfUserExist(userEmail).subscribe((data) => {
        if (data.length !== 0) {
          this.openSnackBar('Email already exists', 'Close');
        } else {
          this.userserv.addUser(this.registerForm.value).subscribe(() => {
            this.openSnackBar('User added', 'Close');
          });
        }
      });
    }
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, 
      horizontalPosition: 'center', 
      verticalPosition:"top" 
    });
  }
  

  canClose(){
    if(this.registerForm.dirty){
      let response = confirm("Changes you made may not be saved.");
      return response;
    }
    else{
      return true;
    }
  }
}