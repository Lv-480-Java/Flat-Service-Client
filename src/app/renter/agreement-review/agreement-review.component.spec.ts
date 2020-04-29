import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementReviewComponent } from './agreement-review.component';

describe('AgreementReviewComponent', () => {
  let component: AgreementReviewComponent;
  let fixture: ComponentFixture<AgreementReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
