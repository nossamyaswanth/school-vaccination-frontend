import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule here
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],  // <-- Add FormsModule to imports array
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = ''; // to store error messages

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Method to handle form submission
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        // success handled in service
      },
      error: (err) => {
        this.error = 'Invalid credentials';
        console.error(err);
      }
    });
  }
}