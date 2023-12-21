import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cake } from '../model/cake';
import { CakeService } from '../services/cake.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cakesData: Cake[] = [];

  constructor(private cakeService: CakeService, private router: Router, public loginService: LoginService) {
  }
  ngOnInit(): void {
    this.getAllCakes();
  }
  getAllCakes() {
    this.cakeService.getAllCakes().subscribe(
      (allcakes) => { this.cakesData = allcakes })
  }

  delete(id: any) {
    this.cakeService.deleteCake(id).subscribe(data => {
      this.getAllCakes();
    })
  }

  searchTitle($event: string) {
    this.cakeService.getAllCakes().subscribe((data) => {
      this.cakesData = data.filter((cake) =>
        cake.cake_name?.toLowerCase().startsWith($event.toLowerCase())
      );
    });
  }
}
