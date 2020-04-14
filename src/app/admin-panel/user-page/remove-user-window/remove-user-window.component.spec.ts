import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserWindowComponent } from './remove-user-window.component';

describe('RemoveUserWindowComponent', () => {
  let component: RemoveUserWindowComponent;
  let fixture: ComponentFixture<RemoveUserWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveUserWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUserWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
