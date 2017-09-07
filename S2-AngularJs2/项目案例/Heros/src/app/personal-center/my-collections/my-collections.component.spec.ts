import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionsComponent } from './my-collections.component';

describe('MyCollectionsComponent', () => {
  let component: MyCollectionsComponent;
  let fixture: ComponentFixture<MyCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
