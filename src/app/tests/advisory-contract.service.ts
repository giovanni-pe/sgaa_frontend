import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

interface AdvisoryContract {
  advisoryContractId: string;
  professorId: string;
  studentId: string;
  researchLineId: string;
  thesisTopic: string;
  message: string;
  status: string | null;
  student: {
    id: string;
    userId: string;
    user: {
      id: string;
      tenantId: string;
      email: string;
      firstName: string;
      lastName: string;
      role: number;
      status: number;
    };
    code: string;
  };
  professor: {
    id: string;
    userId: string;
    researchGroupId: string;
    isCoordinator: boolean;
    user: {
      id: string;
      tenantId: string;
      email: string;
      firstName: string;
      lastName: string;
      role: number;
      status: number;
    };
    researchGroup: {
      id: string;
      name: string;
    };
  };
  researchLine: {
    id: string;
    researchGroupId: string;
    name: string;
    code: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AdvisoryContractService {
  private apiUrl = 'http://localhost:7000/api/v1/AdvisoryContract';

  constructor(private http: HttpClient) {
    console.log('HttpClient injected:', !!http); 
    console.log('API URL:', this.apiUrl);
  }

  getAdvisoryContracts(researchLineId?: string, includeDeleted: boolean = false,startDate?:string,endDate?:string): Observable<ApiResponse> { 
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
  }
}