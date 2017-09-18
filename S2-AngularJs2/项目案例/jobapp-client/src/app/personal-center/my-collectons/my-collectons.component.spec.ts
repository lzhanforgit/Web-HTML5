import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectonsComponent } from './my-collectons.component';

describe('MyCollectonsComponent', () => {
  let component: MyCollectonsComponent;
  let fixture: ComponentFixture<MyCollectonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCollectonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
