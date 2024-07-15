import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryContractDateFilterComponent } from './advisory-contract-date-filter.component';

describe('AdvisoryContractDateFilterComponent', () => {
  let component: AdvisoryContractDateFilterComponent;
  let fixture: ComponentFixture<AdvisoryContractDateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisoryContractDateFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvisoryContractDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
