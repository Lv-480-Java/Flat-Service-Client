import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPostWindowComponent } from './review-post-window.component';

describe('ReviewPostWindowComponent', () => {
  let component: ReviewPostWindowComponent;
  let fixture: ComponentFixture<ReviewPostWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPostWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPostWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
