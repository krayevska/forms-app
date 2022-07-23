import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceAnswerComponent } from './multi-choice-answer.component';

describe('MultiChoiceAnswerComponent', () => {
  let component: MultiChoiceAnswerComponent;
  let fixture: ComponentFixture<MultiChoiceAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiChoiceAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiChoiceAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
