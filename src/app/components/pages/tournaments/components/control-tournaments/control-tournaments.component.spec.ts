import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTournamentsComponent } from './control-tournaments.component';

describe('ControlTournamentsComponent', () => {
  let component: ControlTournamentsComponent;
  let fixture: ComponentFixture<ControlTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTournamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
