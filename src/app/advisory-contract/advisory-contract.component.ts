import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AdvisoryContractService } from '../core/services/advisory-contract.service';
import { FilterLineComponent } from '../filter-line/filter-line.component';
import { AdvisoryContractDateFilterComponent } from '../advisory-contract-date-filter/advisory-contract-date-filter.component';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-advisory-contract',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TranslateModule, FilterLineComponent, AdvisoryContractDateFilterComponent, MessageModalComponent, MatDialogModule,MatIconModule],
  templateUrl: './advisory-contract.component.html',
  styleUrls: ['./advisory-contract.component.scss']
})
export class AdvisoryContractComponent implements OnInit {
  advisoryContracts: any[] = [];
  selectedLine: string = 'ALL';
  includeDeleted: boolean = false;
  startDate: string = '';
  endDate: string = '';

  constructor(private advisoryContractService: AdvisoryContractService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.advisoryContractService.getAdvisoryContracts(this.selectedLine, this.includeDeleted, this.startDate, this.endDate).subscribe(
      (response) => {
        console.log('Response:', response);
        this.advisoryContracts = response.data.items.filter(contract => contract.status === 0);
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

  
 
  openMessageModal(contract: any): void {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '600px',
      data: {
        contractId: contract.advisoryContractId,
        studentName: `${contract.student.user.firstName} ${contract.student.user.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El mensaje de aceptación se envió correctamente.');
        // Aquí puedes manejar acciones adicionales, como actualizar la lista de contratos
      } else {
        console.error('Hubo un error al enviar el mensaje de aceptación.');
      }
    });
  }
  
  
  
  
}
