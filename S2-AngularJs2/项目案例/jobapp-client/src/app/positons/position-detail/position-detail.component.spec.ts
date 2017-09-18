import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDetailComponent } from './position-detail.component';

describe('PositionDetailComponent', () => {
  let component: PositionDetailComponent;
  let fixture: ComponentFixture<PositionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
