import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchComponent } from './launch.component';

describe('RocketComponent', () => {
  let component: LaunchComponent;
  let fixture: ComponentFixture<LaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
