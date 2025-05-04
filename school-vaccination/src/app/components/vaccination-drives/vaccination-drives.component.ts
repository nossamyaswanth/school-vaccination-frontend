import { Component, OnInit } from '@angular/core';
import { VaccinationDrive, VaccinationDriveService } from '../../services/vaccination-drive.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vaccination-drives',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './vaccination-drives.component.html',
  styleUrl: './vaccination-drives.component.css'
})
export class VaccinationDrivesComponent implements OnInit {
  drives: VaccinationDrive[] = [];
  form: FormGroup;
  isEditMode = false;
  selectedDriveId: number | null = null;
  error: string = '';

  constructor(private driveService: VaccinationDriveService, private fb: FormBuilder) {
    this.form = this.fb.group({
      vaccineName: ['', Validators.required],
      location: ['', Validators.required],
      scheduledDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDrives();
  }

  loadDrives() {
    this.driveService.getDrives().subscribe({
      next: (data) => (this.drives = data),
      error: () => (this.error = 'Failed to load drives')
    });
  }

  submit() {
    const formValue = this.form.value;
    const today = new Date();
    const scheduledDate = new Date(formValue.scheduledDate);

    if ((scheduledDate.getTime() - today.getTime()) / (1000 * 3600 * 24) < 15) {
      this.error = 'Drives must be scheduled at least 15 days in advance.';
      return;
    }

    if (this.isEditMode && this.selectedDriveId !== null) {
      this.driveService.updateDrive(this.selectedDriveId, formValue).subscribe(() => {
        this.resetForm();
        this.loadDrives();
      });
    } else {
      this.driveService.addDrive(formValue).subscribe(() => {
        this.resetForm();
        this.loadDrives();
      });
    }
  }

  editDrive(drive: VaccinationDrive) {
    const driveDate = new Date(drive.scheduledDate);
    const today = new Date();

    if (driveDate < today) {
      alert("You can't edit past drives.");
      return;
    }

    this.isEditMode = true;
    this.selectedDriveId = drive.id!;
    this.form.patchValue(drive);
  }

  resetForm() {
    this.form.reset();
    this.isEditMode = false;
    this.selectedDriveId = null;
    this.error = '';
  }
}