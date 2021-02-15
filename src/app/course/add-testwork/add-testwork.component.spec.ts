import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestworkComponent } from './add-testwork.component';

describe('AddTestworkComponent', () => {
  let component: AddTestworkComponent;
  let fixture: ComponentFixture<AddTestworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
