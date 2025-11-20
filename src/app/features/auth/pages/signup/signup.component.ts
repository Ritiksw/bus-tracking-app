import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

type UserRoleOption = 'DRIVER' | 'STATION_MASTER' | 'ADMIN';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {
  readonly roles: { label: string; value: UserRoleOption; description: string }[] = [
    { label: 'Driver', value: 'DRIVER', description: 'Request departures and report trip status.' },
    {
      label: 'Station Master',
      value: 'STATION_MASTER',
      description: 'Approve departures and monitor station queue.'
    },
    { label: 'Admin', value: 'ADMIN', description: 'Manage users, routes, and system settings.' }
  ];

  readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    role: ['DRIVER' as UserRoleOption, Validators.required],
    driverLicenseNumber: [''],
    assignedStationCode: [''],
    adminSecurityCode: ['']
  });

  private readonly roleSubscription: Subscription;

  constructor(private readonly fb: FormBuilder) {
    this.setRoleValidators('DRIVER');

    this.roleSubscription =
      this.form
        .get('role')
        ?.valueChanges.subscribe((role) => this.setRoleValidators(role as UserRoleOption)) ??
      new Subscription();
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }

  get showDriverFields(): boolean {
    return this.form.value.role === 'DRIVER';
  }

  get showStationFields(): boolean {
    return this.form.value.role === 'STATION_MASTER';
  }

  get showAdminFields(): boolean {
    return this.form.value.role === 'ADMIN';
  }

  get passwordMismatch(): boolean {
    const { password, confirmPassword } = this.form.value;
    return !!password && !!confirmPassword && password !== confirmPassword;
  }

  onSubmit(): void {
    if (this.form.invalid || this.passwordMismatch) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...payload } = this.form.value;
    // TODO: Replace with actual API integration via AuthService
    console.log('Submitting signup', payload);
  }

  private setRoleValidators(role: UserRoleOption): void {
    this.resetRoleValidators();

    if (role === 'DRIVER') {
      this.setControlRequired('driverLicenseNumber');
    } else if (role === 'STATION_MASTER') {
      this.setControlRequired('assignedStationCode');
    } else if (role === 'ADMIN') {
      this.setControlRequired('adminSecurityCode');
    }
  }

  private resetRoleValidators(): void {
    ['driverLicenseNumber', 'assignedStationCode', 'adminSecurityCode'].forEach((controlName) => {
      const control = this.form.get(controlName);
      control?.clearValidators();
      control?.setValue('');
      control?.updateValueAndValidity({ emitEvent: false });
    });
  }

  private setControlRequired(controlName: string): void {
    const control = this.form.get(controlName);
    control?.setValidators([Validators.required]);
    control?.updateValueAndValidity({ emitEvent: false });
  }
}

