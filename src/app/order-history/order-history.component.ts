import { Component } from '@angular/core';
import { cakeOrder } from '../model/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  cakeOrders: cakeOrder[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getCakeOrders();
  }

  getCakeOrders(): void {
    this.orderService.getCakeOrders()
      .subscribe(orders => {
        this.cakeOrders = orders;
      });
  }

}
