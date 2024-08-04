import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base-service';
import {AdvisoryContract} from'../models/advisory-contract.model';
interface ApiResponse {
  success: boolean;
  errors: string[] | null;
  detailedErrors: string[];
  data: {
    count: number;
    items: AdvisoryContract[];
    page: number;
    pageSize: number;
  };
}



@Injectable({
  providedIn: 'root'
})
export class AdvisoryContractService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAdvisoryContracts(
    researchLineId?: string,
    includeDeleted: boolean = false,
    startDate?: string,
    endDate?: string,
    page: number = 0,
    pageSize: number = 10
  ): Observable<ApiResponse> {
    return this.performRequest(() => {
      let params = new HttpParams();
      if (researchLineId && researchLineId !== 'ALL') {
        params = params.append('researchLineId', researchLineId);
      }
      if (startDate && startDate !== '') {
        params = params.append('startDate', startDate);
      }
      if (endDate && new Date(endDate).getTime() !== new Date().setHours(0, 0, 0, 0)) {
        params = params.append('endDate', endDate);
      }
      params = params.append('includeDeleted', includeDeleted.toString());
      params = params.append('Page', page.toString());
      params = params.append('PageSize', pageSize.toString());
      return this.http.get<ApiResponse>(`${this.apiUrl}`, { params });
    });
  }
  getAdvisoryContractsByStudentId(
    researchLineId?: string,
    includeDeleted: boolean = false,
    startDate?: string,
    endDate?: string,
    page: number = 0,
    pageSize: number = 10
  ): Observable<ApiResponse> {
    return this.performRequest(() => {
      let params = new HttpParams();
      if (researchLineId && researchLineId !== 'ALL') {
        params = params.append('researchLineId', researchLineId);
      }
      if (startDate && startDate !== '') {
        params = params.append('startDate', startDate);
      }
      if (endDate && new Date(endDate).getTime() !== new Date().setHours(0, 0, 0, 0)) {
        params = params.append('endDate', endDate);
      }
      params = params.append('includeDeleted', includeDeleted.toString());
      params = params.append('Page', page.toString());
      params = params.append('PageSize', pageSize.toString());
      return this.http.get<ApiResponse>(`${this.apiUrl}`, { params });
    });
  }
  

  acceptRequest(contractId: string, message: string): Observable<any> {
    return this.performRequest(() => {
      const url = `${this.apiUrl}/${contractId}/accept`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      });

      const payload = message !== "" ? message : "sin comentarios";
      return this.http.put(url, JSON.stringify(payload), { headers, responseType: 'text' as 'json' });
    });
  }
  deleteAdvisoryContract(contractId: string): Observable<any> {
    const url = `${this.apiUrl}/${contractId}`;
    console.log(contractId+'jjs no llega a eliminar');
    return this.http.delete(url, { responseType: 'text' as 'json' });
  }
}
