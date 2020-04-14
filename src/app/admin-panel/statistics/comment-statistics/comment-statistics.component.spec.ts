import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentStatisticsComponent } from './comment-statistics.component';

describe('CommentStatisticsComponent', () => {
  let component: CommentStatisticsComponent;
  let fixture: ComponentFixture<CommentStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
