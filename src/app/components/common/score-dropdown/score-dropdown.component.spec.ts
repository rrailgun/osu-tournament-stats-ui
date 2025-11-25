import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDropdownComponent } from './score-dropdown.component';

describe('ScoreDropdownComponent', () => {
  let component: ScoreDropdownComponent;
  let fixture: ComponentFixture<ScoreDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
