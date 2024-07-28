import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedAdvisoryContractComponent } from './accepted-advisory-contract.component';

describe('AcceptedAdvisoryContractComponent', () => {
  let component: AcceptedAdvisoryContractComponent;
  let fixture: ComponentFixture<AcceptedAdvisoryContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedAdvisoryContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptedAdvisoryContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
