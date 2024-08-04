import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSelectorComponent } from './professor-selector.component';

describe('ProfessorSelectorComponent', () => {
  let component: ProfessorSelectorComponent;
  let fixture: ComponentFixture<ProfessorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
