import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BaseService } from './base-service';
import { ResearchLine } from '../models/research-line.model';

@Injectable({
  providedIn: 'root'
})
export class ResearchLineService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getResearchLines(): Observable<ResearchLine[]> {
    return this.getAll().pipe(map(response => response.data.items.map((item: any) => ({
        id: item.id,
        name: item.name
      }))))
  }
}
