import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatespageComponent } from './statespage.component';

describe('StatespageComponent', () => {
  let component: StatespageComponent;
  let fixture: ComponentFixture<StatespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatespageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
