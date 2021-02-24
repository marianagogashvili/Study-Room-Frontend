import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAnswersComponent } from './grade-answers.component';

describe('GradeAnswersComponent', () => {
  let component: GradeAnswersComponent;
  let fixture: ComponentFixture<GradeAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
