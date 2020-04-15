import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatRequestsComponent } from './flat-requests.component';

describe('FlatRequestsComponent', () => {
  let component: FlatRequestsComponent;
  let fixture: ComponentFixture<FlatRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
