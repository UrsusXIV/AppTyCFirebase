import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamblersxgroupsComponent } from './gamblersxgroups.component';

describe('GamblersxgroupsComponent', () => {
  let component: GamblersxgroupsComponent;
  let fixture: ComponentFixture<GamblersxgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamblersxgroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamblersxgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
