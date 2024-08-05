import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSelectorByGroupIdComponent } from './professor-selector-by-group-id.component';

describe('ProfessorSelectorByGroupIdComponent', () => {
  let component: ProfessorSelectorByGroupIdComponent;
  let fixture: ComponentFixture<ProfessorSelectorByGroupIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorSelectorByGroupIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorSelectorByGroupIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
