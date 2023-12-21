import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cake } from '../model/cake';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private httpclient: HttpClient) { }

  getAllCakes() {
    return this.httpclient.get<Cake[]>("http://localhost:3000/cakes");
  }

  getOne(id: number) {
    return this.httpclient.get<Cake>("http://localhost:3000/cakes/" + id);
  }

  getByName(name: string) {
    return this.httpclient.get<Cake[]>("http://localhost:3000/cakes?cake_name=" + name);
  }

  addCake(mycake: Cake) {
    return this.httpclient.post<Cake>("http://localhost:3000/cakes", mycake);
  }

  editCake(mycake: Cake) {
    return this.httpclient.put<Cake>("http://localhost:3000/cakes/" + mycake.id, mycake);
  }

  deleteCake(id: number) {
    return this.httpclient.delete<Cake>("http://localhost:3000/cakes/" + id);
  }
}
