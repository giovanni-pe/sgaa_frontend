import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-advisory-contract-date-filter',
  standalone: true,
  templateUrl: './advisory-contract-date-filter.component.html',
  styleUrls: ['./advisory-contract-date-filter.component.scss'],
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class  AdvisoryContractDateFilterComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';

  @Output() dateFilterChanged = new EventEmitter<{ startDate: string, endDate: string }>();
  constructor() {}

  ngOnInit(): void {
   
  }

  onDateFilter(): void {
    console.log(this.startDate+ 'esto se emite');
    this.dateFilterChanged.emit({ startDate: this.startDate, endDate: this.endDate });
  }
}
