import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAreaComponent } from './review-area.component';

describe('ReviewAreaComponent', () => {
  let component: ReviewAreaComponent;
  let fixture: ComponentFixture<ReviewAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
