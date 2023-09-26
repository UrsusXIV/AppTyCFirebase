import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentspageComponent } from './tournamentspage.component';

describe('TournamentspageComponent', () => {
  let component: TournamentspageComponent;
  let fixture: ComponentFixture<TournamentspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
