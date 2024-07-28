import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {
            path: '',
            loadComponent: () => import('./research-group.component').then(m => m.ResearchGroupComponent),
          }
    
  ];
  
  