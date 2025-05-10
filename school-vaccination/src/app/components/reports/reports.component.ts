import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportData: any = null;
  error: string = '';

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getReportData().subscribe({
      next: (data) => {
        this.reportData = {
          totalStudents: data.totalStudents,
          vaccinated: data.vaccinated,
          notVaccinated: data.notVaccinated,
          missedVaccinations: data.missedVaccinations,
          vaccinatedPercentage: data.totalStudents > 0
            ? Math.round((data.vaccinated / data.totalStudents) * 100)
            : 0,
          drivePerformance: data.driveSummary || [] // Ensure drivePerformance is an array
        };
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load report data.';
      }
    });
  }

  downloadReport(): void {
    this.reportsService.downloadVaccinationDetails().subscribe({
      next: (response) => {
        console.log('Download response:', response); // Debugging log
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VaccinationDetails.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to download the report.');
      }
    });
  }
}