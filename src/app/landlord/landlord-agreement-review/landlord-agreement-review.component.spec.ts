import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordAgreementReviewComponent } from './landlord-agreement-review.component';

describe('LandlordAgreementReviewComponent', () => {
  let component: LandlordAgreementReviewComponent;
  let fixture: ComponentFixture<LandlordAgreementReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordAgreementReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordAgreementReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
