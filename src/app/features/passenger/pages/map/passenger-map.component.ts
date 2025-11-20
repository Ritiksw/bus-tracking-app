import { Component } from '@angular/core';

@Component({
  selector: 'app-passenger-map',
  templateUrl: './passenger-map.component.html',
  styleUrls: ['./passenger-map.component.scss']
})
export class PassengerMapComponent {
  activeBuses = [
    { route: 'Route A', eta: '5 min', lastSeen: '1 min ago' },
    { route: 'Route B', eta: '12 min', lastSeen: 'Just now' }
  ];
}

