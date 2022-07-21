import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Question } from '../../utils/interfaces';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public isAnswerOpen = true;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  questionForm = this.fb.group({
    text: [
      '',
      [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(10),
      ],
    ],
    type: ['', Validators.required],
    answers: [''],
  });

  onSubmit(): void {
    console.log(this.questionForm.value);
    let answerOptions: string[] = [];
    if (this.questionForm.value) {
      const answers = this.questionForm.value.answers;
      answerOptions = answers ? this.getAnswerOptions(answers) : [];

      const currentQuestion: Question = {
        text: this.questionForm.value.text,
        type: this.questionForm.value.type,
        creationDate: new Date(),
        answerOptions: answerOptions || [],
        answerDate: null,
      };
      console.log('currentQuestion ', currentQuestion);
      this.localStorageService.addQuestion(currentQuestion);
    }
  }

  getAnswerOptions(answers: string): string[] {
    return answers.replace(/\s/g, '').split(',');
  }

  onChange(e: MatRadioChange): void {
    this.isAnswerOpen = e.value === 'open';
    this.updateValidation(this.isAnswerOpen);
  }

  updateValidation(isAnswerOpen: boolean): void {
    if (!isAnswerOpen) {
      this.questionForm.get('answers')?.setValidators(Validators.required);
    } else {
      this.questionForm.get('answers')?.clearValidators();
    }
    this.questionForm.get('answers')?.updateValueAndValidity();
  }
}
