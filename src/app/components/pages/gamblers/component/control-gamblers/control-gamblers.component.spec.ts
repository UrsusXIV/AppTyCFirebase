import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGamblersComponent } from './control-gamblers.component';

describe('ControlGamblersComponent', () => {
  let component: ControlGamblersComponent;
  let fixture: ComponentFixture<ControlGamblersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlGamblersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlGamblersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
