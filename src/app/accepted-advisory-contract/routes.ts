import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {
            path: '',
            loadComponent: () => import('./accepted-advisory-contract.component').then(m => m.AcceptedAdvisoryContractComponent),
          
            
          }
    
  ];
  
  