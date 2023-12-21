import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCakeComponent } from './add-cake/add-cake.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewOneCakeComponent } from './view-one-cake/view-one-cake.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './services/admin.guard';
import { cakeGuard } from './services/cake.guard';
import { OrderComponent } from './order/order.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { userGuard } from './services/user.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "addCake",
    component: AddCakeComponent,
    canActivate: [adminGuard],
    canDeactivate: [cakeGuard]
  },
  {
    path: "home",
    redirectTo: ""
  },
  {
    path: "viewOneCake/:id",
    component: ViewOneCakeComponent
  },
  {
    path: "editDetails/:id",
    component: AddCakeComponent,
    canActivate: [adminGuard]
  },
  {
    path: "orderHistory",
    component: OrderHistoryComponent,
    canActivate: [adminGuard]
  },
  {
    path: " deleteDetails/:id",
    component: AddCakeComponent,
    canActivate: [adminGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canDeactivate: [cakeGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "viewOneCake/:id/order",
    component: OrderComponent,
  },
  {
    path: "viewOneCake/:id/order/user-order",
    component: UserOrderComponent,
    canActivate: [userGuard]
  },
  {
    path: "**", //matches anything
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
