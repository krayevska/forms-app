import { AbstractControl, FormArray, Validators } from '@angular/forms';
import { Question } from './interfaces';

export function setQuestion(questionForm: any): Question {
  const currentQuestion: Question = {
    text: questionForm.text,
    type: questionForm.type,
    creationDate: new Date(Date.now()).toLocaleString(),
    answerOptions: questionForm.answers,
    answer: {
      answered: false,
      open: undefined,
      single: undefined,
      multi: undefined,
    },
  };
  return currentQuestion;
}

export function editQuestion(questionForm: any, question: Question): Question {
  let editedQuestion = question;
  editedQuestion.text = questionForm.text;
  editedQuestion.type = questionForm.type;
  editedQuestion.answerOptions = questionForm.answers;
  return editedQuestion;
}

export function updateValidation(
  isAnswerOpen: boolean,
  answers: FormArray<any>
): void {
  if (isAnswerOpen) {
    answers.clearValidators();
    answers.updateValueAndValidity();
    answers.controls.forEach((c) => {
      c.setValue('');
      c.markAsPristine();
      c.clearValidators();
      c.updateValueAndValidity();
    });
  } else {
    answers.setValidators(minLengthArray(3));
    answers.updateValueAndValidity();
    answers.controls.forEach((c) => {
      c.setValidators(Validators.required);
      c.updateValueAndValidity();
    });
  }
}

export function minLengthArray(min: number) {
  return (c: AbstractControl): { [key: string]: any } | null => {
    if (c.value.length >= min) {
      return null;
    }

    return { minLengthArray: { valid: false } };
  };
}
