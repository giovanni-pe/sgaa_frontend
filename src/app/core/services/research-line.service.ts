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

  // getResearchLines(): Observable<ResearchLine[]> {
  //   return this.getAll().pipe(map(response => response.data.items.map((item: any) => ({
  //       id: item.id,
  //       name: item.name
  //     }))))
  // }
  getResearchLines(groupId?: string): Observable<ResearchLine[]> {
    let query = `?includeDeleted=false`;
    if (groupId) {
    query += `&researchGroupId=${groupId}`;
    }
    return this.performRequest(() =>this.http.get<any>(this.apiUrl+query).pipe(
      map(response => response.data.items.map((item: any) => ({
        id: item.id,
        name: item.name
      })))
    ));
  }
  getResearchLinesByGroupId(groupId: string): Observable<ResearchLine[]> {
    console.log('consultando')
    const url = `${this.apiUrl}?ResearachGroupId=${groupId}&includeDeleted=false`;
    return this.http.get<any>(url).pipe(
      map(response => response.data.items.map((item: any) => ({
        id: item.id,
        name: item.name
      })))
    );
  }

}
