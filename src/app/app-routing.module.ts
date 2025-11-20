import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./features/driver/driver.module').then((m) => m.DriverModule)
  },
  {
    path: 'station',
    loadChildren: () =>
      import('./features/station/station.module').then((m) => m.StationModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'passenger',
    loadChildren: () =>
      import('./features/passenger/passenger.module').then(
        (m) => m.PassengerModule
      )
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
