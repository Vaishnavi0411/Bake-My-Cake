import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cakeOrder } from '../model/order';
import { User } from '../model/user';
import { OrderService } from '../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cake } from '../model/cake';
import { CakeService } from '../services/cake.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'] 
})

export class OrderComponent implements OnInit {

  myorder: cakeOrder = {
    cakeid: 0,
    email: '',
    cakeName: '',
    price: 0,
    quantity: 1,
    username: '',
    total: 0,
    orderDate:'',
    message:'',
    firstname:'',
    lastname:'',
    address:'',
    city:'',
    state:'',
    postalCode:0

  };
  mycake: Cake = {
    id: 0,
    cake_name: '',
    price: 0,
    weight: 0
  };

  myuser: any = {
    username: '',
    email: ''
  };
orderDate: any;

  constructor(
    private cakeService: CakeService,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      let cakeId = params.get("id") ?? 0;
      this.getOneCake(cakeId);
    });
  }

  getOneCake(id: any): void {
    this.cakeService.getOne(id).subscribe((data) => {
      this.mycake = data;
    });
  }

  async placeOrder() {
    await this.userService.checkIfUserExist(this.loginService.email).subscribe((data) => {
      this.myuser = data;
    })

    if (this.myorder.cakeid) {
      await this.cakeService.getOne(this.myorder.cakeid).subscribe((data) => {
        this.mycake = data
      })
    }
    let order: cakeOrder = {
      email: this.loginService.email,
      username: this.loginService.userName,
      cakeName: this.mycake.cake_name,
      price: this.mycake.price,
      cakeid: this.mycake.id,
      quantity: this.myorder.quantity,
      total: this.mycake.total,
      firstname:this.myorder.firstname,
      lastname:this.myorder.lastname,
      address:this.myorder.address,
      message:this.myorder.message,
      city:this.myorder.city,
      state:this.myorder.state,
      postalCode:this.myorder.postalCode,
      orderDate:this.myorder.orderDate
    };

    this.orderService.placeOrder(order).subscribe(
      () => {
        this.snackBar.open('Order placed successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition:"bottom"
        });
      },
      (error) => {
        this.snackBar.open('Error placing order', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }

}


