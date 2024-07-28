import { Component, OnInit } from '@angular/core';
import { ResearchGroupService } from '../../core/services/research-group.service';

declare var $: any;

@Component({
  selector: 'app-research-group',
  templateUrl: './research-group.component.html',
  styleUrls: ['./research-group.component.scss'],
  standalone: true, // Esto indica que el componente es standalone
  imports: [] // Aquí puedes importar otros módulos si es necesario
})
export class ResearchGroupComponent implements OnInit {

  constructor(private researchGroupService: ResearchGroupService) {}

  ngOnInit() {
    this.researchGroupService.getResearchGroups().subscribe(data => {
      $(document).ready(function() {
        $('#researchGroupTable').DataTable({
          data: data.data.items,
          "pageLength": 5,
          columns: [
            { title: "ID", data: "id" },
            { title: "Name", data: "name" }
          ],
          responsive: true,
          dom: 'Bfrtip',
          orientation: 'landscape',
          buttons: [{
            extend: 'collection',
            text: 'Reportes',
            orientation: 'landscape',
            buttons: [{
                text: 'Copiar',
                extend: 'copy',

            }, {
                extend: 'pdf'
            }, {
                extend: 'csv'
            }, {
                extend: 'excel'
            }, {
                text: 'Imprimir',
                extend: 'print'
            }]
        }, {
            extend: 'colvis',
            text: 'Visor de columnas',
            collectionLayaut: 'fixed three-column'
        }]
        });
       
      });
    });
  }
}


