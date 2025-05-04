import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  student: any = { fullName: '', grade: '', dateOfBirth: '', isVaccinated: false };
  isEditMode: boolean = false;
  certificateFile: File | null = null;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditMode = true;
      this.getStudentDetails(studentId);
    }
  }

  getStudentDetails(id: string) {
    this.studentService.getStudentById(id).subscribe((data: any) => {
      this.student = data;
      // Ensure date format is compatible with input type="date"
      this.student.dateOfBirth = this.student.dateOfBirth?.split('T')[0]; 
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.certificateFile = file;
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.student.id, this.student).subscribe(() => {
        if (this.certificateFile) {
          this.uploadCertificate(this.student.id);
        }
        this.router.navigate(['/students']);
      });
    } else {
      this.studentService.addStudent(this.student).subscribe((newStudent: any) => {
        if (this.certificateFile) {
          this.uploadCertificate(newStudent.id);
        }
        this.router.navigate(['/students']);
      });
    }
  }

  uploadCertificate(studentId: number) {
    if (this.certificateFile) {
      const formData = new FormData();
      formData.append('file', this.certificateFile);
  
      this.studentService.uploadCertificate(studentId, formData).subscribe({
        next: (response) => {
          console.log('Certificate uploaded successfully:', response);
        },
        error: (error) => {
          console.error('Error uploading certificate:', error);
        }
      });
    }
  }
  
}