import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatFilterComponent } from './flat-filter.component';

describe('FlatFilterComponent', () => {
  let component: FlatFilterComponent;
  let fixture: ComponentFixture<FlatFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
