import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5020/api/Students';
  private recordUrl = 'http://localhost:5020/api/VaccinationRecord';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Ensuring proper content-type for requests
    });
  }

  // GET: Fetch all students
  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  // GET: Fetch a single student by ID
  getStudentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // POST: Add a new student
  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student, { headers: this.getHeaders() });
  }

  // PUT: Update an existing student
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student, { headers: this.getHeaders() });
  }

  // DELETE: Delete a student by ID
  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // POST: Upload a certificate for a student
  uploadCertificate(studentId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Do not set 'Content-Type' here
    });
  
    return this.http.post<any>(`${this.apiUrl}/${studentId}/upload`, formData, { headers });
  }

  // POST: Upload Excel file for bulk student upload
  uploadStudentsExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Do not set 'Content-Type' here for FormData
    });

    return this.http.post<any>(`${this.apiUrl}/upload-excel`, formData, { headers });
  }

  // uploadCertificate(studentId: number, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(`${this.apiUrl}/${studentId}/upload`, formData, { headers: this.getHeaders() });
  // }

  // POST: Mark a student as vaccinated
  markAsVaccinated(data: any): Observable<any> {
    return this.http.post<any>(this.recordUrl, data, { headers: this.getHeaders() });
  }

  downloadCertificate(studentId: number): Observable<Blob> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`http://localhost:5020/api/Students/${studentId}/download`, { 
      headers, 
      responseType: 'blob'  // Specify that we expect a binary response (file)
    });
  }
}
