import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendRegistrationTokenComponent } from './resend-registration-token.component';

describe('ResendRegistrationTokenComponent', () => {
  let component: ResendRegistrationTokenComponent;
  let fixture: ComponentFixture<ResendRegistrationTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendRegistrationTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendRegistrationTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
