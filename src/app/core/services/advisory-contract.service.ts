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
    endDate?: string
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

      console.log('Fetching advisory contracts with params:', params.toString());
      return this.http.get<ApiResponse>(this.apiUrl, { params });
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

}
