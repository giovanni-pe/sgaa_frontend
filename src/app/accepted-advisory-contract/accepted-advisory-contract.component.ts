import { Component, OnInit } from '@angular/core';
import { AdvisoryContractService } from '../core/services/advisory-contract.service';
import { AdvisoryContract } from '../core/models/advisory-contract.model';

declare var $: any;

@Component({
  selector: 'app-accepted-advisory-contract',
  templateUrl: './accepted-advisory-contract.component.html',
  styleUrls: ['./accepted-advisory-contract.component.scss'],
  standalone: true, // Esto indica que el componente es standalone
  imports: [] // Aquí puedes importar otros módulos si es necesario
})
export class AcceptedAdvisoryContractComponent implements OnInit {
  acceptedAdvisoryContracts: AdvisoryContract[] = [];

  constructor(private advisoryContractService: AdvisoryContractService) {}

  ngOnInit() {
    this.advisoryContractService.getAdvisoryContracts()
      .subscribe(data => {
        this.acceptedAdvisoryContracts = data.data.items.filter(contract => contract.status === 1);
        this.initializeDataTable(this.acceptedAdvisoryContracts);
      });
  }

  initializeDataTable(contracts: AdvisoryContract[]) {
    $(document).ready(function() {
      $('#acceptedAdvisoryContractTable').DataTable({
        data: contracts,
        "pageLength": 5,
        columns: [
          { title: "ID", data: "advisoryContractId" },
          { title: "Thesis Topic", data: "thesisTopic" },
          { title: "Professor", data: "professor.user.firstName" },
          { title: "Student", data: "student.user.firstName" },
          { title: "Research Line", data: "researchLine.name" }
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
          collectionLayout: 'fixed three-column'
        }]
      });
    });
  }
}
