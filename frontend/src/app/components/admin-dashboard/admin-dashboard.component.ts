import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userTasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      alert("Admin token not found. Please login.");
      return;
    }

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:4000/api/admin/dashboard', { headers })
      .subscribe({
        next: (data) => {
          this.userTasks = data;
        },
        error: (err) => {
          console.error("Error fetching admin data", err);
          alert("Unauthorized or token expired. Please login again.");
        }
      });
  }
}

