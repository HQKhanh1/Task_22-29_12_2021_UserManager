import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpassComponent } from './checkpass.component';

describe('CheckpassComponent', () => {
  let component: CheckpassComponent;
  let fixture: ComponentFixture<CheckpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckpassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
