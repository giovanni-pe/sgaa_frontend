import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { INavData } from '@coreui/angular';

// Interfaz extendida
interface ExtendedNavData extends INavData {
  roles?: string[]; // Opcional para permitir elementos sin restricciones de roles
}

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private userRole: string = 'guest'; // Inicializar con un valor por defecto

  constructor(private translate: TranslateService) {
    this.loadUserFromStorage(); // Cargar el rol del usuario desde el almacenamiento local al iniciar el servicio
  }

  // Método para cargar el rol del usuario desde el almacenamiento local
  private loadUserFromStorage() {
    this.userRole = localStorage.getItem('userRole') || 'guest'; // 'guest' por defecto si no hay rol
  }

  // Método para obtener los elementos de navegación, filtrados por el rol del usuario
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
        roles: ['admin', 'user','Student','Professor'] 
      },
      {
        title: true,
        name: this.translate.instant('Asesorados'),
        roles:  ['Professor']  // Visible solo para administradores
      },
      {
        name: this.translate.instant('Solicitudes'),
        url: '/advisory-contracts',
        iconComponent: { name: 'cil-bell' },
        roles: ['Professor'] // Visible solo para usuarios normales
      },
      {
        name: this.translate.instant('Aceptados'),
        url: '/accepted-advisory-contracts',
        linkProps: { fragment: 'headings' },
        iconComponent: { name: 'cilSave' },
        roles: ['Professor'] // Visible para admin y usuario
      },
      {
        name: this.translate.instant('Seguimiento'),
        title: true,
        roles: ['admin'] // Visible solo para administradores
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
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Breadcrumbs'),
            url: '/base/breadcrumbs',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Cards'),
            url: '/base/cards',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Carousel'),
            url: '/base/carousel',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Collapse'),
            url: '/base/collapse',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('List Group'),
            url: '/base/list-group',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Navs & Tabs'),
            url: '/base/navs',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Pagination'),
            url: '/base/pagination',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Placeholder'),
            url: '/base/placeholder',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Popovers'),
            url: '/base/popovers',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Progress'),
            url: '/base/progress',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Spinners'),
            url: '/base/spinners',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Tables'),
            url: '/base/tables',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Tabs'),
            url: '/base/tabs',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Tooltips'),
            url: '/base/tooltips',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          }
        ],
        roles: ['admin', 'user'] // Visible para admin y usuario
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
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          
        ],
        roles: ['admin', 'user'] // Visible para admin y usuario
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
            roles: ['admin'] // Solo visible para administradores
          },
          {
            name: this.translate.instant('Button groups'),
            url: '/buttons/button-groups',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Dropdowns'),
            url: '/buttons/dropdowns',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          }
        ],
        roles: ['admin', 'user'] // Visible para admin y usuario
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
            roles: ['user'] // Solo visible para usuarios normales
          },
          {
            name: this.translate.instant('Select'),
            url: '/forms/select',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Checks & Radios'),
            url: '/forms/checks-radios',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Range'),
            url: '/forms/range',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Input Group'),
            url: '/forms/input-group',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Floating Labels'),
            url: '/forms/floating-labels',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Layout'),
            url: '/forms/layout',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Validation'),
            url: '/forms/validation',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          }
        ],
        roles: ['admin', 'user'] // Visible para admin y usuario
      },
      {
        name: this.translate.instant('Calendario'),
        iconComponent: { name: 'cil-calendar' },
        url: '/charts',
        roles: ['admin', 'user'] // Visible para admin y usuario
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
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('CoreUI Flags'),
            url: '/icons/flags',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('CoreUI Brands'),
            url: '/icons/brands',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          }
        ],
        roles: ['admin', 'user'] // Visible para admin y usuario
      },
      {
        name: this.translate.instant('Notificaciones'),
        url: '/notifications',
        iconComponent: { name: 'cil-bell' },
        children: [
          {
            name: this.translate.instant('Alerts'),
            url: '/notifications/alerts',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Badges'),
            url: '/notifications/badges',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Modal'),
            url: '/notifications/modal',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Toast'),
            url: '/notifications/toasts',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          }
        ],
        roles: ['admin', 'user'] // Visible para admin y usuario
      },
      {
        name: this.translate.instant('Reportes'),
        url: '/widgets',
        iconComponent: { name: 'cilSpeedometer' },
        badge: {
          color: 'info',
          text: 'NEW'
        },
        roles: ['admin'] // Solo visible para administradores
      },
      {
        name: this.translate.instant('Logros'),
        url: '/widgets',
        iconComponent: { name: 'cil-star' },
        badge: {
          color: 'info',
          text: 'NEW'
        },
        roles: ['user'] // Solo visible para usuarios normales
      },
      {
        title: true,
        name: this.translate.instant('Configuraciones'),
        roles: ['admin', 'user'] // Visible para admin y usuario
      },
      {
        name: this.translate.instant('Pages'),
        url: '/login',
        iconComponent: { name: 'cilSettings' },
        children: [
          {
            name: this.translate.instant('Login'),
            url: '/login',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Register'),
            url: '/register',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Error 404'),
            url: '/404',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          },
          {
            name: this.translate.instant('Error 500'),
            url: '/500',
            icon: 'nav-icon-bullet',
            roles: ['admin', 'user'] // Visible para admin y usuario
          }
        ],
        roles: ['admin', 'user'] // Visible para admin y usuario
      },
      {
        title: true,
        name: this.translate.instant('Links'),
        class: 'mt-auto',
        roles: ['admin', 'user'] // Visible para admin y usuario
      },
      {
        name: this.translate.instant('Documentación'),
        url: 'https://coreui.io/angular/docs/5.x/',
        iconComponent: { name: 'cil-description' },
        attributes: { target: '_blank' },
        roles: ['admin', 'user'] // Visible para admin y usuario
      }
    ].filter(item => this.isRoleAllowed(item)); // Filtrar elementos según el rol del usuario
  }

  private isRoleAllowed(navItem: ExtendedNavData): boolean {
    if (!navItem.roles) {
      return true; // Si no hay restricción de roles, está permitido
    }
    return navItem.roles.includes(this.userRole); // Permitir si el rol está en la lista de roles permitidos
  }
}
