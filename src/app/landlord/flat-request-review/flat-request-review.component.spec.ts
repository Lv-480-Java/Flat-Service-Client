import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatRequestReviewComponent } from './flat-request-review.component';

describe('FlatRequestReviewComponent', () => {
  let component: FlatRequestReviewComponent;
  let fixture: ComponentFixture<FlatRequestReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatRequestReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatRequestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
