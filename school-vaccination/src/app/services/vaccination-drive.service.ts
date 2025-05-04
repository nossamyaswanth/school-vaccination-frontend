import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface VaccinationDrive {
  id?: number;
  vaccineName: string;
  scheduledDate: string;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class VaccinationDriveService {
  private baseUrl = 'http://localhost:5020/api/vaccinationdrive';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Ensuring proper content-type for requests
    });
  }

  getDrives(): Observable<VaccinationDrive[]> {
    return this.http.get<VaccinationDrive[]>(this.baseUrl,{ headers: this.getHeaders() });
  }

  addDrive(drive: VaccinationDrive): Observable<any> {
    return this.http.post(this.baseUrl, drive, { headers: this.getHeaders() });
  }

  updateDrive(id: number, drive: VaccinationDrive): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, drive, { headers: this.getHeaders() });
  }
}