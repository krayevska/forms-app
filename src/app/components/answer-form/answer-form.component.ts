import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { Question } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
})
export class AnswerFormComponent implements OnInit {
  @Input() question?: Question;
  public answersForm?: FormGroup;
  public openAnswer = false;
  public answerOptions?: string[];
  public isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    console.log('question ', this.question);
    this.openAnswer = this.question?.type === 'open';
    if (!this.openAnswer) {
      this.answerOptions = this.question?.answerOptions;
    }
    this.answersForm = this.fb.group({
      open: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(10),
        ],
      ],
      option: ['', Validators.required],
    });
    if (this.question?.type) {
      this.updateValidation(this.question?.type);
    }
  }

  updateValidation(answerType: string): void {
    let optionsControl = this.answersForm?.get('option');
    let openAnswerControl = this.answersForm?.get('open');
    console.log('optionsControl ', optionsControl);
    if (answerType === 'open') {
      optionsControl?.clearValidators();
      optionsControl?.updateValueAndValidity();
    } else {
      openAnswerControl?.clearValidators();

      optionsControl?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.answersForm?.value);
    if (this.question) {
      this.localStorageService.answerQuestion(
        this.question,
        this.answersForm?.value
      );
    }
  }
}
