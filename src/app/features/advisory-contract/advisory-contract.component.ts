import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AdvisoryContractService } from '../../core/services/advisory-contract.service';
import { FilterLineComponent } from '../filter-line/filter-line.component';
import { AdvisoryContractDateFilterComponent } from '../advisory-contract-date-filter/advisory-contract-date-filter.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { DeleteAdvisoryContractComponent } from '../../delete-advisory-contract/delete-advisory-contract.component';

@Component({
  selector: 'app-advisory-contract',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TranslateModule, FilterLineComponent, AdvisoryContractDateFilterComponent,
     MatDialogModule, MatIconModule, MatPaginatorModule],
  templateUrl: './advisory-contract.component.html',
  styleUrls: ['./advisory-contract.component.scss']
})
export class AdvisoryContractComponent implements OnInit {
  advisoryContracts: any[] = [];
  selectedLine: string = 'ALL';
  includeDeleted: boolean = false;
  startDate: string = '';
  endDate: string = '';

  // Paginator properties
  length = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private advisoryContractService: AdvisoryContractService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.advisoryContractService.getAdvisoryContracts(this.selectedLine, this.includeDeleted, this.startDate, this.endDate, this.pageIndex, this.pageSize).subscribe(
      (response) => {
        console.log('Response:', response);
        this.advisoryContracts = response.data.items.filter(contract => contract.status === 0);
        this.length = response.data.count;
      },
      (error) => {
        console.error('Error fetching advisory contracts', error);
      }
    );
  }

  onLineChanged(line: string): void {
    this.selectedLine = line;
    this.loadContracts();
  }

  onDateFilterChanged(filter: { startDate: string, endDate: string }): void {
    this.startDate = filter.startDate;
    this.endDate = filter.endDate;
    this.loadContracts();
  }

  onPageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadContracts();
  }

  openAcceptModal(contract: any): void {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '600px',
      data: {
        contractId: contract.advisoryContractId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El contrato se aceptó correctamente.');
        this.loadContracts(); // Refresca la lista de contratos
      } else {
        console.error('Hubo un error al aceptar el contrato.');
      }
    });
  }

  openDeleteModal(contract: any): void {
    const dialogRef = this.dialog.open(DeleteAdvisoryContractComponent, {
      width: '600px',
      data: {
        contractId: contract.advisoryContractId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El contrato se eliminó correctamente.');
        this.loadContracts(); // Refresca la lista de contratos
      } else {
        console.error('Hubo un error al eliminar el contrato.');
      }
    });
  }
}
