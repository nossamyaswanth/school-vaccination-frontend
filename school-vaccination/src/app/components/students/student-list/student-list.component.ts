import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  // Fetch the list of students
  getStudents() {
    this.studentService.getStudents().subscribe((data: any) => {
      this.students = data;
      console.log(this.students);
    });
  }

  // Navigate to the view page for the selected student
  viewStudent(id: number) {
    this.router.navigate(['/students', id]);
  }

  // Navigate to the edit page for the selected student
  editStudent(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  // Handle student deletion
  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.getStudents();
      });
    }
  }
}