import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSelectorByGroupIdComponent } from './line-selector-by-group-id.component';

describe('LineSelectorByGroupIdComponent', () => {
  let component: LineSelectorByGroupIdComponent;
  let fixture: ComponentFixture<LineSelectorByGroupIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineSelectorByGroupIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineSelectorByGroupIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
