import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AddRoundModalComponent } from './add-round-modal.component';

describe('AddRoundModalComponent', () => {
  let component: AddRoundModalComponent;
  let fixture: ComponentFixture<AddRoundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoundModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits add event with trimmed name', () => {
    component.visible = true;
    component.newRoundName = '  TestRound  ';
    spyOn(component.add, 'emit');

    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith('TestRound');
  });

  it('does not emit add when name is blank or loading', () => {
    component.visible = true;
    component.newRoundName = '   ';
    spyOn(component.add, 'emit');

    component.onAdd();
    expect(component.add.emit).not.toHaveBeenCalled();

    component.newRoundName = 'Name';
    component.isLoading = true;
    component.onAdd();
    expect(component.add.emit).not.toHaveBeenCalled();
  });

  it('emits close event when close button clicked', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('resets name when visible toggled off', () => {
    component.newRoundName = 'Hello';
    component.visible = false;
    component.ngOnChanges({
      visible: {
        currentValue: false,
        previousValue: true,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.newRoundName).toBe('');
  });
});
