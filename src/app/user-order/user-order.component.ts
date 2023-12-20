import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { cakeOrder } from '../model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css'
})
export class UserOrderComponent {

  constructor(private orderService: OrderService, private rs: ActivatedRoute, private loginservice: LoginService, private router: Router) { }
  orders: cakeOrder[] = [];

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderService.getOrdersByEmail(this.loginservice.email).subscribe((data) => {
      this.orders = data;
      console.log(data);

    })
  }
  back() {
    this.router.navigateByUrl("home")
  }

}

