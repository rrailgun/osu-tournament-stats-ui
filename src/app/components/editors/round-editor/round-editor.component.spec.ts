import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundEditorComponent } from './round-editor.component';

describe('RoundEditorComponent', () => {
  let component: RoundEditorComponent;
  let fixture: ComponentFixture<RoundEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
