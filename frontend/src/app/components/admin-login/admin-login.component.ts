import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})

export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:4000/api/admin/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('adminToken', res.token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }
}
