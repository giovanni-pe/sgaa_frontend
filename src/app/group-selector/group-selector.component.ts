import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ResearchGroupService } from '../core/services/research-group.service';  // Asegúrate de la ruta correcta

@Component({
  selector: 'app-group-selector',
  standalone: true,
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.scss'],
  imports: [CommonModule, FormsModule,TranslateModule],
  providers: [ResearchGroupService]
})
export class GroupSelectorComponent implements OnInit {
  groups: { id: string, name: string }[] = [];
  selectedGroupId: string = '';

  @Output() groupChanged = new EventEmitter<string>();

  constructor(private researchGroupService: ResearchGroupService) {}

  ngOnInit(): void {
    this.researchGroupService.getResearchGroups().subscribe({
      next: (data) => {
        this.groups = data.data.items;
      },
      error: (error) => console.error('Error fetching groups', error)
    });
  }

  onGroupChange(): void {
    this.groupChanged.emit(this.selectedGroupId);
  }
}
