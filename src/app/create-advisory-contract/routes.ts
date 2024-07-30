import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {
            path: '',
            loadComponent: () => import('./create-advisory-contract.component').then(m => m.CreateAdvisoryContractComponent),
          }
    
  ];
  
  