import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverDashboardComponent } from './pages/dashboard/driver-dashboard.component';

@NgModule({
  declarations: [DriverDashboardComponent],
  imports: [SharedModule, CoreModule, DriverRoutingModule]
})
export class DriverModule {}

