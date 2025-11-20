import { Component } from '@angular/core';

interface PendingRequest {
  tripId: string;
  bus: string;
  from: string;
  to: string;
  requestedAt: string;
}

@Component({
  selector: 'app-station-queue',
  templateUrl: './station-queue.component.html',
  styleUrls: ['./station-queue.component.scss']
})
export class StationQueueComponent {
  queue: PendingRequest[] = [
    {
      tripId: 'TRIP-3021',
      bus: 'Bus 22',
      from: 'Central Station',
      to: 'West Park',
      requestedAt: '2 mins ago'
    },
    {
      tripId: 'TRIP-3020',
      bus: 'Bus 17',
      from: 'Central Station',
      to: 'Airport',
      requestedAt: '5 mins ago'
    }
  ];
}

