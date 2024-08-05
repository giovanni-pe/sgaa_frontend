import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ResearchLineService } from '../core/services/research-line.service';
import {ResearchLine} from '../core/models/research-line.model';
@Component({
  selector: 'app-line-selector-by-group-id',
  standalone: true,
  templateUrl: './line-selector-by-group-id.component.html',
  styleUrls: ['./line-selector-by-group-id.component.scss'],
  imports: [CommonModule, FormsModule], // Asegúrate de incluir FormsModule aquí
  providers: [ResearchLineService]
})
export class LineSelectorByGroupIdComponent implements OnInit, OnChanges {
  lines: ResearchLine[] = [];
  selectedLineId: string = '';

  @Input() groupId: string = '';
  @Output() lineChanged = new EventEmitter<string>();

  constructor(private researchLineService: ResearchLineService) {}

  ngOnInit(): void {
    this.loadLines();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId'] && !changes['groupId'].firstChange) {
      this.loadLines();
    }
  }

  loadLines(): void {
    if (this.groupId) {
      console.log(this.groupId);
      this.researchLineService.getResearchLinesByGroupId(this.groupId).subscribe(
        data => {
          this.lines = data;
          console.log(this.lines)
        },
        error => {
          console.error('Error fetching research lines:', error);
          this.lines = [];
        }
      );
    } else {
      this.lines = [];
    }
  }

  onLineChange(): void {
    this.lineChanged.emit(this.selectedLineId);
  }
}
