import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summary: any = null;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Not authenticated. Please login.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:5020/api/Reports/summary', { headers }).subscribe({
      next: (data) => {
        const today = new Date();
        const in30Days = new Date();
        in30Days.setDate(today.getDate() + 30);

        const filteredDrives = data.driveSummary.filter((drive: any) => {
          const driveDate = new Date(drive.scheduledDate);
          return driveDate >= today && driveDate <= in30Days;
        });

        const percentage = data.totalStudents > 0
          ? Math.round((data.vaccinated / data.totalStudents) * 100)
          : 0;

        this.summary = {
          totalStudents: data.totalStudents,
          vaccinated: data.vaccinated,
          notVaccinated: data.notVaccinated,
          percentage: percentage,
          upcomingDrives: filteredDrives
        };
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load dashboard data. Please check login or token.';
      }
    });
  }
}