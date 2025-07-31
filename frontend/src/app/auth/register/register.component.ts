import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submit() {
    if (!this.email || !this.password) {
      this.showPopup('Email and password are required');
      return;
    }

    this.loading = true;

    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.showPopup('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        const message = err?.error?.message || 'Registration failed';
        this.showPopup(message);
      }
    });
  }

  private showPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
