// student-view.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-view',
  imports: [CommonModule],
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: any = {};

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.getStudentDetails(studentId);
    }
  }

  getStudentDetails(id: string) {
    this.studentService.getStudentById(id).subscribe((data: any) => {
      this.student = data;
    });
  }

  // downloadCertificate(): void {
  //   const certificateFileName = this.student.certificateFileName;
  //   if (certificateFileName) {
  //     // Assuming you have an endpoint for downloading the certificate
  //     const certificateUrl = `http://localhost:5020/api/Students/${this.student.id}/download`;
  //     window.open(certificateUrl, '_blank');
  //   }
  // }
  downloadCertificate(): void {
    const studentId = this.student.id;

    this.studentService.downloadCertificate(studentId).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);  // Create a URL for the Blob object
        const a = document.createElement('a');  // Create an anchor element
        a.href = url;
        a.download = this.student.certificateFileName;  // Set the file name for download
        a.click();  // Programmatically click the link to trigger the download
        window.URL.revokeObjectURL(url);  // Clean up the object URL
      },
      (error) => {
        console.error('Error downloading the certificate', error);
      }
    );
  }
  
}