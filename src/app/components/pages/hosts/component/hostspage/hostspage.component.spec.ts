import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostspageComponent } from './hostspage.component';

describe('HostspageComponent', () => {
  let component: HostspageComponent;
  let fixture: ComponentFixture<HostspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
