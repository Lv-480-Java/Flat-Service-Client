import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementReviewAreaComponent } from './agreement-review-area.component';

describe('AgreementReviewAreaComponent', () => {
  let component: AgreementReviewAreaComponent;
  let fixture: ComponentFixture<AgreementReviewAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementReviewAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementReviewAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
