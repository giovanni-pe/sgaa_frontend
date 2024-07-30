import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdvisoryContractComponent } from './delete-advisory-contract.component';

describe('DeleteAdvisoryContractComponent', () => {
  let component: DeleteAdvisoryContractComponent;
  let fixture: ComponentFixture<DeleteAdvisoryContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAdvisoryContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAdvisoryContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
