import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent {
  pendingRequests = [
    { from: 'Central Station', to: 'North Station', status: 'Awaiting approval' }
  ];

  activeSegment = {
    route: 'Route A',
    from: 'Central Station',
    to: 'North Station',
    status: 'Pending'
  };
}

