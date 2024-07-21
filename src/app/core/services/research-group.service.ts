import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { BaseService } from './base-service';


@Injectable({
  providedIn: 'root'
})
export class ResearchGroupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getResearchGroups(): Observable<any> {
    return this.getAll();
  }
}
