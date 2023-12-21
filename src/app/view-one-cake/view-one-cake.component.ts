import { Component } from '@angular/core';
import { CakeService } from '../services/cake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cake } from '../model/cake';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-view-one-cake',
  templateUrl: './view-one-cake.component.html',
  styleUrl: './view-one-cake.component.css'
})
export class ViewOneCakeComponent {

  mycake: Cake = {};

  cakeRequest: any;
  cake: any;
  minDate: any;
  constructor(private cakeService: CakeService, private activateRoute: ActivatedRoute,public loginService: LoginService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      let cakeId = params.get("id") ?? 0;
      this.getOneCake(cakeId);
    })
  }

  getOneCake(id: any) {
    this.cakeService.getOne(id).subscribe((data) => {
      this.mycake = data;
    })
  }
}


