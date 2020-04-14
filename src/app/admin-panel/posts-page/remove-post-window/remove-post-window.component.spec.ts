import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePostWindowComponent } from './remove-post-window.component';

describe('RemovePostWindowComponent', () => {
  let component: RemovePostWindowComponent;
  let fixture: ComponentFixture<RemovePostWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePostWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePostWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
