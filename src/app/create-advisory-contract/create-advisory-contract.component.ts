import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LineSelectorComponent } from '../line-selector/line-selector.component'; // Asegúrate de la ruta correcta
import { ProfessorSelectorComponent } from '../professor-selector/professor-selector.component'; // Asegúrate de la ruta correcta
import { StudentService } from '../core/services/student.service'; // Asegúrate de la ruta correcta
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-advisory-contract',
  templateUrl: './create-advisory-contract.component.html',
  styleUrls: ['./create-advisory-contract.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LineSelectorComponent,
    ProfessorSelectorComponent,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
})
export class CreateAdvisoryContractComponent implements OnInit {
  advisoryForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private studentService: StudentService,
    private snackBar: MatSnackBar
  ) {
    this.advisoryForm = this.fb.group({
      professorId: [''],
      studentId: [''],
      researchLineId: [''],
      thesisTopic: [''],
      message: [''],
      status: [0]
    });
  }

  ngOnInit(): void {
    this.loadCurrentStudent();
  }

  loadCurrentStudent(): void {
    this.studentService.getCurrentStudent().subscribe(
      student => {
        this.advisoryForm.patchValue({
          studentId: student.id,
        });
      },
      error => {
        console.error('Error fetching student data', error);
      }
    );
  }

  onLineChanged(lineId: string) {
    this.advisoryForm.patchValue({ researchLineId: lineId });
  }

  onProfessorChanged(professorId: string) {
    this.advisoryForm.patchValue({ professorId: professorId });
  }

  sendRequest() {
    const url = 'http://localhost:7000/api/v1/AdvisoryContract';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = this.advisoryForm.value;
    const options = {
      headers: headers,
      withCredentials: true // Esto habilita el envío de credenciales (cookies) en la solicitud
    };
    this.http.post(url, body,  options)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          this.errorMessage = 'Ocurrió un error al enviar la solicitud. Por favor, inténtelo de nuevo más tarde.';
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('Response:', response);
        this.errorMessage = null; // Limpiar mensaje de error si la solicitud fue exitosa
        this.showSuccessMessage();
        this.resetForm();
      });
  }

  showSuccessMessage() {
    this.snackBar.open('Solicitud enviada con éxito', 'Cerrar', {
      duration: 3000, // El mensaje se mostrará durante 3 segundos
    });
  }

  resetForm() {
    this.advisoryForm.reset({
      professorId: '',
      studentId: this.advisoryForm.value.studentId, // Mantener el ID del estudiante
      researchLineId: '',
      thesisTopic: '',
      message: '',
      status: 0
    });
  }
}
