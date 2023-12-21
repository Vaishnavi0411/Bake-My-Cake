import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cakeOrder } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/order", orderData);
  }

  getCakeOrders(): Observable<cakeOrder[]> {
    return this.http.get<cakeOrder[]>("http://localhost:3000/order");
  }

  getOrdersByEmail(email: any): Observable<cakeOrder[]> {
    return this.http.get<cakeOrder[]>("http://localhost:3000/order?email=" + email);
  }
}
