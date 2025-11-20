import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  stats = [
    { label: 'Active trips', value: 8 },
    { label: 'Pending approvals', value: 5 },
    { label: 'Drivers online', value: 12 }
  ];
}

