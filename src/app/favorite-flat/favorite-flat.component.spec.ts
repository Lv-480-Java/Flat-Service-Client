import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFlatComponent } from './favorite-flat.component';

describe('FavoriteFlatComponent', () => {
  let component: FavoriteFlatComponent;
  let fixture: ComponentFixture<FavoriteFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
