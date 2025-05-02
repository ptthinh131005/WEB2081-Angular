import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CategoryListComponent } from './components/admin/category-list/category-list.component';
import { CategoryAddComponent } from './components/admin/category-add/category-add.component';
import { CategoryEditComponent } from './components/admin/category-edit/category-edit.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { ProductAddComponent } from './components/admin/product-add/product-add.component';
import { ProductEditComponent } from './components/admin/product-edit/product-edit.component';
import { AdminGuard } from './auth/admin-guard';

export const routes: Routes = [
  {path: 'home',component:HomeComponent},
  {path: 'login',component:LoginComponent},
  {path: 'products',component:ProductsComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: '',redirectTo: '/home',pathMatch:'full'},
  {path:'admin',component: DashboardComponent, canActivate: [AdminGuard],
    children:[
      {path:'category-list',component:CategoryListComponent},
      {path:'category-add',component:CategoryAddComponent},
      {path:'category-edit/:id',component:CategoryEditComponent},
      {path:'product-list',component:ProductListComponent},
      {path:'product-add',component:ProductAddComponent},
      {path:'product-edit/:id',component:ProductEditComponent}
    ]
  },
  {path: '**',redirectTo:'/home'}
];
