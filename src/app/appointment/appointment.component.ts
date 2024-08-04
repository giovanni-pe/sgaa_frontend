import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessorSelectorComponent } from '../professor-user-id-selector/professor-selector.component'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Importar módulos de Angular Material necesarios
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ProfessorSelectorComponent,
    MatCardModule, // Importar MatCardModule
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  appointmentForm: FormGroup;
  calendars: any[] = [];
  selectedIframeUrl: SafeResourceUrl = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.appointmentForm = this.fb.group({
      professorId: ['', Validators.required],
      studentId: ['', Validators.required],
      calendarId: ['', Validators.required],
      dateTime: ['', Validators.required],
      professorProgress: [''],
      studentProgress: [''],
      googleEventId: [''],
      professorEmail: ['', [Validators.required, Validators.email]],
      studentEmail: ['', [Validators.required, Validators.email]],
      startDateTime: ['', Validators.required],
      endDateDateTime: ['', Validators.required],
      description: ['']
    });
  }

  onProfessorChanged(professorId: string) {
    this.appointmentForm.patchValue({ professorId: professorId });
    this.fetchProfessorCalendars(professorId);
  }

  fetchProfessorCalendars(professorId: string) {
    const url = `http://localhost:7000/api/v1/UserCalendar/ByUserId/${professorId}?status=1&pageNumber=1&pageSize=10&includeDeleted=false`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.calendars = response.data.items;
          if (this.calendars.length > 0) {
            const firstCalendar = this.calendars[0];
            this.appointmentForm.patchValue({ 
              calendarId: firstCalendar.calendarId 
            });
            this.selectedIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(firstCalendar.iframeUrl);
          }
        }
      },
      (error) => {
        console.error('Error fetching calendars:', error);
      }
    );
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.http.post('http://localhost:7000/api/v1/Appointment', this.appointmentForm.value)
        .subscribe(response => {
          console.log('Appointment created:', response);
        }, error => {
          console.error('Error creating appointment:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
