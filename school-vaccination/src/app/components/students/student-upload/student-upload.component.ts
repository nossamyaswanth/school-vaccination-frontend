import { Component } from '@angular/core';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-upload',
  imports: [],
  templateUrl: './student-upload.component.html',
  styleUrl: './student-upload.component.css'
})
export class StudentUploadComponent {
  selectedFile: File | null = null;

  constructor(private service: StudentService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) return;
    // this.service.uploadCSV(0, this.selectedFile).subscribe({
    //   next: () => alert('Upload successful'),
    //   error: () => alert('Upload failed')
    // });
  }
}