import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetspageComponent } from './betspage.component';

describe('BetspageComponent', () => {
  let component: BetspageComponent;
  let fixture: ComponentFixture<BetspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
