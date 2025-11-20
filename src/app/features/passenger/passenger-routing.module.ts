import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerMapComponent } from './pages/map/passenger-map.component';

const routes: Routes = [
  {
    path: '',
    component: PassengerMapComponent,
    title: 'Passenger View'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule {}

