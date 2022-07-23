import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiseAnswerComponent } from './single-choise-answer.component';

describe('SingleChoiseAnswerComponent', () => {
  let component: SingleChoiseAnswerComponent;
  let fixture: ComponentFixture<SingleChoiseAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleChoiseAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleChoiseAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
