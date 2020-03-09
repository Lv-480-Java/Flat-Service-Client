import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatDetailedComponent } from './flat-detailed.component';

describe('FlatDetailedComponent', () => {
  let component: FlatDetailedComponent;
  let fixture: ComponentFixture<FlatDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
