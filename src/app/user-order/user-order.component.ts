import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { cakeOrder } from '../model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Cake } from '../model/cake';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css'
})
export class UserOrderComponent {

  constructor(private orderService: OrderService, private rs: ActivatedRoute, private loginservice: LoginService, private router: Router) { }
  orders: cakeOrder[] = [];
  mycake: Cake = {
    id: 0,
    cake_name: '',
    price: 0,
    weight: 0
  };
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderService.getOrdersByEmail(this.loginservice.email).subscribe((data) => {
      this.orders = data;
    })
  }
}

