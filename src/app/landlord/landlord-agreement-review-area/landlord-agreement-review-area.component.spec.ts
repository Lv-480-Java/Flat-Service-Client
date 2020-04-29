import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordAgreementReviewAreaComponent } from './landlord-agreement-review-area.component';

describe('LandlordAgreementReviewAreaComponent', () => {
  let component: LandlordAgreementReviewAreaComponent;
  let fixture: ComponentFixture<LandlordAgreementReviewAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordAgreementReviewAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordAgreementReviewAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
