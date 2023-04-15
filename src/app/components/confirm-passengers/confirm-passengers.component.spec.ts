import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPassengersComponent } from './confirm-passengers.component';

describe('ConfirmPassengersComponent', () => {
  let component: ConfirmPassengersComponent;
  let fixture: ComponentFixture<ConfirmPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPassengersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
