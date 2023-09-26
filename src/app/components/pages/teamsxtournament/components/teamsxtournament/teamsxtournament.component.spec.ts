import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsxtournamentComponent } from './teamsxtournament.component';

describe('TeamsxtournamentComponent', () => {
  let component: TeamsxtournamentComponent;
  let fixture: ComponentFixture<TeamsxtournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsxtournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsxtournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
