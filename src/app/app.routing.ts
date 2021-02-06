import { RouterModule, Routes } from "@angular/router";
import { DemoComponent } from "./demo/demo.component";
import { RatingComponent } from "./todo/rating.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
const arr : Routes=  [

  {path:'', component:HomeComponent},
  {path:'rating', component:RatingComponent},
  {path:'demo', component:DemoComponent},
  {path:'**',redirectTo: 'pagenotfound' },
]

export const arrRouting = RouterModule.forRoot(arr);
