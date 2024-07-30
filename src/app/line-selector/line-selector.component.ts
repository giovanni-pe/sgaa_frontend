import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ResearchLineService } from '../core/services/research-line.service'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-line-selector',
  standalone: true,
  templateUrl: './line-selector.component.html',
  styleUrls: ['./line-selector.component.scss'],
  imports: [CommonModule, FormsModule, TranslateModule],
  providers: [ResearchLineService]
})
export class LineSelectorComponent implements OnInit {
  lines: { id: string, name: string }[] = [];
  selectedLineId: string = 'none';

  @Output() lineChanged = new EventEmitter<string>();

  constructor(private researchLineService: ResearchLineService) {}

  ngOnInit(): void {
    this.researchLineService.getResearchLines().subscribe(data => {
      this.lines = data
      console.log(this.lines);
    });
  }

  onLineChange(): void {
    this.lineChanged.emit(this.selectedLineId);
  }
}
