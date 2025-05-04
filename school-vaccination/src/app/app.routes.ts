import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { StudentUploadComponent } from './components/students/student-upload/student-upload.component';
import { MarkVaccinationComponent } from './components/students/mark-vaccination/mark-vaccination.component';
import { StudentViewComponent } from './components/students/student-view/student-view.component';
import { VaccinationDrivesComponent } from './components/vaccination-drives/vaccination-drives.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard] },
  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: 'students/:id', component: StudentViewComponent },
  { path: 'students/mark-vaccination/:id', component: MarkVaccinationComponent },
  { path: 'drives', component: VaccinationDrivesComponent },
  { path: 'reports', component: ReportsComponent }
];