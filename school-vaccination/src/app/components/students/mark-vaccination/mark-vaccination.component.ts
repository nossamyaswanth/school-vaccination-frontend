import { Component } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mark-vaccination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mark-vaccination.component.html'
})
export class MarkVaccinationComponent {
  studentId: number = 0;
  driveId: number = 0;

  constructor(private service: StudentService) {}

  mark() {
    const data = {
      studentId: this.studentId,
      vaccinationDriveId: this.driveId
    };
    this.service.markAsVaccinated(data).subscribe(() => {
      alert('Marked as vaccinated');
    });
  }
}