import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ProfessorService, Professor } from '../core/services/professor.service';

@Component({
  selector: 'app-professor-selector-by-group-id',
  standalone: true,
  templateUrl: './professor-selector-by-group-id.component.html',
  styleUrls: ['./professor-selector-by-group-id.component.scss'],
  imports: [CommonModule, FormsModule], // Asegúrate de incluir FormsModule aquí
  providers: [ProfessorService]
})
export class ProfessorSelectorByGroupIdComponent implements OnInit, OnChanges {
  professors: Professor[] = [];
  selectedProfessorId: string = '';

  @Input() groupId: string = '';
  @Output() professorChanged = new EventEmitter<string>();

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.loadProfessors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId'] && !changes['groupId'].firstChange) {
      this.loadProfessors();
    }
  }

  loadProfessors(): void {
    if (this.groupId) {
      this.professorService.getProfessorsByGroupId(this.groupId).subscribe(
        data => {
          this.professors = data;
        },
        error => {
          console.error('Error fetching professors:', error);
          this.professors = [];
        }
      );
    } else {
      this.professors = [];
    }
  }

  onProfessorChange(): void {
    this.professorChanged.emit(this.selectedProfessorId);
  }
}
