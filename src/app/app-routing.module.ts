import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { NewitemComponent } from './newitem/newitem.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomepageComponent,
  children:[
    {path:'marketplace',component:MarketplaceComponent},
    {path:'newitem',component:NewitemComponent},
    {path:'history',component:HistoryComponent}
  ]
  },
  {path:"home/logout",redirectTo:"login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
