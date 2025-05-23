import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'http://localhost:5020/api/Reports';

  constructor(private http: HttpClient) {}

  getReportData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/summary`, { headers });
  }

  downloadVaccinationDetails(): Observable<Blob> {
    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/download-vaccination-details`, {
      headers,
      responseType: 'blob' // Expect a binary file (Excel)
    });
  }
  
}