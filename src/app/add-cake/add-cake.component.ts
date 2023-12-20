import { Component, OnInit } from '@angular/core';
import { Cake } from '../model/cake';
import { CakeService } from '../services/cake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from '../services/cake.guard';

@Component({
  selector: 'app-add-cake',
  templateUrl: './add-cake.component.html',
  styleUrls: ['./add-cake.component.css']
})
export class AddCakeComponent implements OnInit,CanComponentDeactivate {
  mycake: Cake = {
    id: 0,
    cake_name: '',
    price: 0
  };
  isEditCake: boolean = false;

  constructor(
    private cakeService: CakeService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  addCake() {
    if (this.isEditCake) {
      this.cakeService.editCake(this.mycake).subscribe((data) => {
        this.router.navigateByUrl('home');
      });
    } else {
      this.cakeService.addCake(this.mycake).subscribe((data) => {
        this.router.navigateByUrl('home');
      });
    }
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      let cakeId = params.get('id') ?? 0;
      this.getOneCake(cakeId);
    });
  }

  getOneCake(id: any) {
    this.cakeService.getOne(id).subscribe((data) => {
      this.mycake = data;
      this.isEditCake = true;
    });
  }


  canClose(): boolean {
    if (this.mycake.cake_name!=""||this.mycake.category!=""||this.mycake.price) {
      return confirm('Changes you made may not be saved. Are you sure you want to leave?');
    } else {
      return true;
    }
  }
}
