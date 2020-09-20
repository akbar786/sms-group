import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityFormComponent } from './city-form/city-form.component';
import { ListCityComponent } from './list-city/list-city.component';

const routes: Routes = [
  {
    path: '',
    component: ListCityComponent
  },
  {
    path: 'city/add',
    component: CityFormComponent
  },
  {
    path: 'city/update/:id',
    component: CityFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
