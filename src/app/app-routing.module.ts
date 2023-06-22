import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './general/home/home.component';
import { AboutComponent } from './general/about/about.component';
import { ContactComponent } from './general/contact/contact.component';
import { ProductsComponent } from './general/products/products.component';
import { AdminLoginComponent } from './general/admin-login/admin-login.component';
import { LoginComponent } from './general/login/login.component';
import { RegisterComponent } from './general/register/register.component';
import { AdminModule } from './admin/admin.module';
import { ProductComponent } from './general/product/product.component';
import { CartComponent } from './general/cart/cart.component';
import { CheckoutComponent } from './general/checkout/checkout.component';
import { OrdersuccessComponent } from './general/ordersuccess/ordersuccess.component';

const routes: Routes = [
  {
    path : "",
    component : HomeComponent
  },
  {
    path: "products/:categoryid",
    component : ProductsComponent
  },
  {
    path: "product/:id",
    component : ProductComponent
  },
  {
    path : "about",
    component : AboutComponent
  },
  {
    path : "cart",
    component : CartComponent
  },
  {
    path : "checkout",
    component : CheckoutComponent
  },
  {
    path : "contact",
    component : ContactComponent
  },
  {
    path : "adminlogin",
    component : AdminLoginComponent
  },
  {

    path : "userlogin",
    component : LoginComponent

  },
  {

    path : "register",
    component : RegisterComponent

  },
  {

    path : "ordersuccess",
    component : OrdersuccessComponent

  },
  {

    path : "admin", loadChildren:()=>import('./admin/admin.module').then(
      m=>m.AdminModule
    )


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
