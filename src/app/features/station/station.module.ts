import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { StationRoutingModule } from './station-routing.module';
import { StationQueueComponent } from './pages/queue/station-queue.component';

@NgModule({
  declarations: [StationQueueComponent],
  imports: [SharedModule, CoreModule, StationRoutingModule]
})
export class StationModule {}

