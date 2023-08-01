import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamblerspageComponent } from './gamblerspage.component';

describe('GamblerspageComponent', () => {
  let component: GamblerspageComponent;
  let fixture: ComponentFixture<GamblerspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamblerspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamblerspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
