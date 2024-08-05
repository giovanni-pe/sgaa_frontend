import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './base-service';

// Definición de la interfaz para los profesores
export interface Professor {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends BaseService {


  constructor(http: HttpClient) {
    super(http);
  }

  getProfessorsByGroupId(groupId: string): Observable<Professor[]> {
    const url = `${this.apiUrl}?researchGroupId=${groupId}&includeDeleted=false`;
    console.log(url)
    return this.http.get<any>(url).pipe(
      map(response => response.data.items.map((item: any) => ({
        id: item.id,
        name: `${item.user.firstName}  ${ item.user.lastName}`

      })))
    );
  }

  
}
