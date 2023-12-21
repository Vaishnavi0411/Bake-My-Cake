import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { Cake } from '../model/cake';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public loginService: LoginService) { }
  private breakpointObserver = inject(BreakpointObserver);
  mycake: Cake = {
    id: 0,
    cake_name: '',
    price: 0,
    weight: 0
  };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    logout(){
      this.loginService.isAdminLoggedIn=false;
      this.loginService.isUserLoggedIn=false;
    }
}
