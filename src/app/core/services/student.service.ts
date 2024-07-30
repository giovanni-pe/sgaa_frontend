import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:7000/api/v1/Student/current';

  constructor(private http: HttpClient) { }

  getCurrentStudent(): Observable<any> {
    const userId = localStorage.getItem('userId'); // Suponiendo que 'userId' está en localStorage

    if (!userId) {
      console.error('UserId is not available in local storage');
      return throwError('UserId is not available in local storage');
    }

    const url = `${this.apiUrl}/${userId}`;

    return this.http.get<any>(url)
      .pipe(
        map(response => response.data), // Extraer la propiedad 'data' de la respuesta
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
      if (error.status === 400) {
        errorMessage = `Invalid request: ${error.error}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
