import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetgroupsComponent } from './betgroups.component';

describe('BetgroupsComponent', () => {
  let component: BetgroupsComponent;
  let fixture: ComponentFixture<BetgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetgroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
