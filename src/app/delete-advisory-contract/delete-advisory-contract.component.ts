import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvisoryContractService } from '../core/services/advisory-contract.service';

@Component({
  selector: 'app-delete-advisory-contract',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-advisory-contract.component.html',
  styleUrls: ['./delete-advisory-contract.component.scss']
})
export class DeleteAdvisoryContractComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAdvisoryContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contractId: string },
    private advisoryContractService: AdvisoryContractService
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.advisoryContractService.deleteAdvisoryContract(this.data.contractId).subscribe(
      () => {
        this.dialogRef.close(true); // Pasamos un valor indicando que se confirmó la eliminación
      },
      (error) => {
        console.error('Error deleting contract:', error);
        this.dialogRef.close(false); // Pasamos un valor indicando que hubo un error
      }
    );
  }
}

