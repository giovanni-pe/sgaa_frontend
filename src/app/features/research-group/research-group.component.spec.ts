import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchGroupComponent } from './research-group.component';

describe('ResearchGroupComponent', () => {
  let component: ResearchGroupComponent;
  let fixture: ComponentFixture<ResearchGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResearchGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
