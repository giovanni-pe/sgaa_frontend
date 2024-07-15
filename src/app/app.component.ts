import { Component, OnInit , APP_INITIALIZER} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { AdvisoryContractComponent } from './advisory-contract/advisory-contract.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { ResearchGroupComponent } from './research-group/research-group.component';
import { ResearchLineService} from './core/services/research-line.service';
import { ResearchLine } from './core/models/research-line.model';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';
@Component({
  selector: 'app-root',
  template: `

    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet,LoginComponent, AdvisoryContractComponent,ResearchGroupComponent]
})
export class AppComponent implements OnInit {
  title = 'Sistema Gestion de Asesorados';
  researchLines$!: Observable<ResearchLine[]>;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private authService: AuthService,
    private researchLineService: ResearchLineService,
    private languajeService: LanguageService,
  ) {
    this.titleService.setTitle(this.title);
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.researchLines$ = this.researchLineService.getResearchLines();
     this.researchLines$.forEach(element => {
      console.log(element)
     });
    console.log(  "hola : "+this.authService.getUserId())
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
  ///proxi 
    });
  }
 
}
 

