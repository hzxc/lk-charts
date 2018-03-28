import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  // {path:'home',component:LineCartComponent},
  // {path:'barChart',component:areaListComponent},
  // {path:'doughuntChart',component:DoughnutChartComponent},
  // {path:'pieChart',component:PieChartComponent},
]


@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
