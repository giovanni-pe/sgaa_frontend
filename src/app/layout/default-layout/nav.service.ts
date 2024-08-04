import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { INavData } from '@coreui/angular';

// Interfaz extendida
interface ExtendedNavData extends INavData {
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private userRole: string = 'guest';

  constructor(private translate: TranslateService) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    this.userRole = localStorage.getItem('userRole') || 'guest';
  }

  getNavItems(): ExtendedNavData[] {
    return [
      {
        name: this.translate.instant('SGAA'),
        url: '/dashboard',
        iconComponent: { name: 'cil-Calendar' },
        badge: {
          color: 'info',
          text: 'FIIS-UNAS'
        },
        roles: ['admin', 'Student', 'Professor'] 
      },
      {
        title: true,
        name: this.translate.instant('Asesorados'),
        roles: ['Professor']
      },
      {
        name: this.translate.instant('Solicitudes'),
        url: '/advisory-contracts',
        iconComponent: { name: 'cil-bell' },
        roles: ['Professor']
      },
      {
        name: this.translate.instant('Aceptados'),
        url: '/accepted-advisory-contracts',
        linkProps: { fragment: 'headings' },
        iconComponent: { name: 'cilSave' },
        roles: ['Professor']
      },
      {
        name: this.translate.instant('Seguimiento'),
        title: true,
        roles: ['admin']
      },
      {
        name: this.translate.instant('Estudiantes'),
        url: '/base',
        iconComponent: { name: 'cilPeople' },
        children: [
          {
            name: this.translate.instant('Accordion'),
            url: '/base/accordion',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Breadcrumbs'),
            url: '/base/breadcrumbs',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Cards'),
            url: '/base/cards',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Carousel'),
            url: '/base/carousel',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Collapse'),
            url: '/base/collapse',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('List Group'),
            url: '/base/list-group',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Navs & Tabs'),
            url: '/base/navs',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Pagination'),
            url: '/base/pagination',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Placeholder'),
            url: '/base/placeholder',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Popovers'),
            url: '/base/popovers',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Progress'),
            url: '/base/progress',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Spinners'),
            url: '/base/spinners',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Tables'),
            url: '/base/tables',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Tabs'),
            url: '/base/tabs',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Tooltips'),
            url: '/base/tooltips',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          }
        ],
        roles: ['admin']
      },
      {
        name: this.translate.instant('Contratos de Asesoria'),
        url: '/buttons',
        iconComponent: { name: 'cil-cursor' },
        children: [
          {
            name: this.translate.instant('create-advisory-contract'),
            url: 'create-advisory-contract',
            icon: 'nav-icon-bullet',
            roles: ['Student']
          },
          {
            name: this.translate.instant('Button groups'),
            url: '/buttons/button-groups',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'Student']
          },
          {
            name: this.translate.instant('Dropdowns'),
            url: '/buttons/dropdowns',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          }
        ],
        roles: ['admin', 'Student']
      },
      {
        name: this.translate.instant('Contratos de Asesoria'),
        url: '/buttons',
        iconComponent: { name: 'cil-cursor' },
        children: [
          {
            name: this.translate.instant('Button groups'),
            url: '/buttons/button-groups',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'Professor']
          },
          {
            name: this.translate.instant('Dropdowns'),
            url: '/buttons/dropdowns',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          }
        ],
        roles: ['Professor']
      },
      {
        name: this.translate.instant('Citas'),
        url: '/forms',
        iconComponent: { name: 'cil-notes' },
        children: [
          {
            name: this.translate.instant('crear cita'),
            url: 'create-appointment',
            icon: 'nav-icon-bullet',
            roles: []
          },
          {
            name: this.translate.instant('Select'),
            url: '/forms/select',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Checks & Radios'),
            url: '/forms/checks-radios',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Range'),
            url: '/forms/range',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Input Group'),
            url: '/forms/input-group',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Floating Labels'),
            url: '/forms/floating-labels',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Layout'),
            url: '/forms/layout',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Validation'),
            url: '/forms/validation',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          }
        ],
        roles: ['Student']
      },
      {
        name: this.translate.instant('Grupos'),
        url: '/base',
        iconComponent: { name: 'cil-people' },
        children: [
          {
            name: this.translate.instant('ListGrups'),
            url: '/research-group',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'Student','Professor']
          },
        ],
        roles: ['admin', 'Professor','Student']
      },
      {
        name: this.translate.instant('lines'),
        url: '/base',
        iconComponent: { name: 'cil-people' },
        children: [
          {
            name: this.translate.instant('ListGrups'),
            url: '/research-group',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'Student','Professor']
          },
        ],
        roles: ['admin', 'Professor','Student']
      },
      {
        name: this.translate.instant('Professors'),
        url: '/base',
        iconComponent: { name: 'cil-people' },
        children: [
          {
            name: this.translate.instant('ListGrups'),
            url: '/research-group',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'Student','Professor']
          },
        ],
        roles: ['admin', 'Student']
      },
      {
        name: this.translate.instant('Citas'),
        url: '/forms',
        iconComponent: { name: 'cil-notes' },
        children: [
          {
            name: this.translate.instant('crear cita'),
            url: 'create-appointment',
            icon: 'nav-icon-bullet',
            roles: []
          },
          {
            name: this.translate.instant('Select'),
            url: '/forms/select',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Checks & Radios'),
            url: '/forms/checks-radios',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Range'),
            url: '/forms/range',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Input Group'),
            url: '/forms/input-group',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Floating Labels'),
            url: '/forms/floating-labels',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Layout'),
            url: '/forms/layout',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Validation'),
            url: '/forms/validation',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          }
        ],
        roles: ['Professor']
      },
      {
        name: this.translate.instant('Calendario'),
        iconComponent: { name: 'cil-calendar' },
        url: '/charts',
        roles: ['admin']
      },
      {
        name: this.translate.instant('Profesores'),
        iconComponent: { name: 'cil-calculator' },
        url: '/icons',
        children: [
          {
            name: this.translate.instant('CoreUI Free'),
            url: '/icons/coreui-icons',
            icon: 'nav-icon-bullet',
            badge: {
              color: 'success',
              text: 'FREE'
            },
            roles: ['admin']
          },
          {
            name: this.translate.instant('CoreUI Flags'),
            url: '/icons/flags',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('CoreUI Brands'),
            url: '/icons/brands',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          }
        ],
        roles: ['admin']
      }, {
        name: this.translate.instant('Reportes'),
        url: '/widgets',
        iconComponent: { name: 'cilSpeedometer' },
        badge: {
          color: 'info',
          text: 'NEW'
        },
        roles: ['admin','Student','Professor']
      },
      {
        name: this.translate.instant('Tesis En Desarrollo FIIS'),
        url: '/widgets',
        iconComponent: { name: 'cil-star' },
        badge: {
          color: 'info',
          text: 'NEW'
        },
        roles: ['admin','Student','Professor'] 
      },
      {
        title: true,
        name: this.translate.instant('Configuraciones'),
        roles: ['admin']
      },
      {
        name: this.translate.instant('Pages'),
        url: '/login',
        iconComponent: { name: 'cilSettings' },
        children: [
          {
            name: this.translate.instant('Nuestra Facultad'),
            url: 'https://fiis.unas.edu.pe/nuestra-facultad',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Repositorio UNAS'),
            url: 'https://repositorio.unas.edu.pe/home',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('MyLoft'),
            url: 'https://app.myloft.xyz/',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          },
          {
            name: this.translate.instant('Alicia'),
            url: 'https://alicia.concytec.gob.pe/',
            icon: 'nav-icon-bullet',
            roles: ['admin']
          }
        ],
        roles: ['admin','Students','Professor']
      },
      {
        title: true,
        name: this.translate.instant('Links'),
        class: 'mt-auto',
        roles: ['admin','Professor','Student']
      },
      {
        name: this.translate.instant('Mas informacion'),
        url: 'https://fiis.unas.edu.pe/unidad-de-investigacion',
        iconComponent: { name: 'cil-description' },
        attributes: { target: '_blank' },
        roles: ['admin','Professor','Student']
      }
    ].filter(item => this.isRoleAllowed(item));
  }

  private isRoleAllowed(navItem: ExtendedNavData): boolean {
    if (!navItem.roles) {
      return true;
    }
    return navItem.roles.includes(this.userRole);
  }
}
