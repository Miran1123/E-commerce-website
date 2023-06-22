import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductvaritiesComponent } from './productvarities/productvarities.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    NavbarComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductComponent,
    ProductvaritiesComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
