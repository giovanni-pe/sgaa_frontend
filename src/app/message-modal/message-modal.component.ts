import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AdvisoryContractService } from '../core/services/advisory-contract.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, TranslateModule,MatDialogModule],
})
export class MessageModalComponent {
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contractId: string, studentName: string },
    private advisoryContractService: AdvisoryContractService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    this.advisoryContractService.acceptRequest(this.data.contractId, this.message).subscribe(response => {
      console.log('Solicitud aceptada:', response);
      window.location.reload();
      this.dialogRef.close(true);  // Cierra el modal y notifica al componente principal que se envió el mensaje
    }, error => {
      console.error('Error al aceptar la solicitud:', error);
      this.dialogRef.close(false);  // Cierra el modal y notifica al componente principal que hubo un error
    });
  }
}

