import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerMapComponent } from './pages/map/passenger-map.component';

@NgModule({
  declarations: [PassengerMapComponent],
  imports: [SharedModule, PassengerRoutingModule]
})
export class PassengerModule {}

