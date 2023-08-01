import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffspageComponent } from './playoffspage.component';

describe('PlayoffspageComponent', () => {
  let component: PlayoffspageComponent;
  let fixture: ComponentFixture<PlayoffspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayoffspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayoffspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
