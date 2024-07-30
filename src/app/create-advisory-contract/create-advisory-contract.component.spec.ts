import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvisoryContractComponent } from './create-advisory-contract.component';

describe('CreateAdvisoryContractComponent', () => {
  let component: CreateAdvisoryContractComponent;
  let fixture: ComponentFixture<CreateAdvisoryContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdvisoryContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAdvisoryContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
