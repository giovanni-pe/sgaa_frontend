import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

interface Professor {
  id: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

@Component({
  selector: 'app-professor-selector',
  standalone: true,
  templateUrl: './professor-selector.component.html',
  styleUrls: ['./professor-selector.component.scss'],
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class ProfessorSelectorComponent implements OnInit {
  professors: Professor[] = [];
  selectedProfessorId: string = '';

  @Output() professorChanged = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:7000/api/v1/Professor?includeDeleted=false')
      .subscribe(response => {
        if (response.success) {
          this.professors = response.data.items;
        }
      });
  }

  onProfessorChange(): void {
    this.professorChanged.emit(this.selectedProfessorId);
  }
}
