import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulespageComponent } from './rulespage.component';

describe('RulespageComponent', () => {
  let component: RulespageComponent;
  let fixture: ComponentFixture<RulespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulespageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
