import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cake } from '../model/cake';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private httpclient: HttpClient) { }

  getAllCakes() { //get
    return this.httpclient.get<Cake[]>("http://localhost:3000/cakes");
  }

  getOne(id: number) { //get
    return this.httpclient.get<Cake>("http://localhost:3000/cakes/" + id);
  }

  getByName(name: string) { //get
    return this.httpclient.get<Cake[]>("http://localhost:3000/cakes?cake_name=" + name);
  }

  addCake(mycake: Cake) { //post
    return this.httpclient.post<Cake>("http://localhost:3000/cakes", mycake);
  }

  editCake(mycake: Cake) { //put
    return this.httpclient.put<Cake>("http://localhost:3000/cakes/" + mycake.id, mycake);
  }

  deleteCake(id: number) { //delete
    return this.httpclient.delete<Cake>("http://localhost:3000/cakes/" + id);
  }
}
