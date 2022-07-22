import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Question } from '../../utils/interfaces';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { setQuestion, updateValidation } from '../../utils/configFunctions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public isAnswerOpen = true;
  public updateValidation = updateValidation;
  //@ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  goToQuestions(): void {
    this.router.navigate(['']);
  }
  //////////textarea
  // ngOnInit(): void {}
  // questionForm = this.fb.group({
  //   text: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.maxLength(100),
  //       Validators.minLength(10),
  //     ],
  //   ],
  //   type: ['', Validators.required],
  //   answers: [''],
  // });

  // onSubmit(): void {
  //   console.log(this.questionForm.value);

  //   let answerOptions: string[] = [];
  //   if (this.questionForm.value) {
  //     const answers = this.questionForm.value.answers;
  //     answerOptions = answers ? this.getAnswerOptions(answers) : [];

  //     const currentQuestion: Question = {
  //       text: this.questionForm.value.text,
  //       type: this.questionForm.value.type,
  //       creationDate: new Date(Date.now()).toLocaleString();,
  //       answerOptions: answerOptions || [],
  //       answerDate: null,
  //     };
  //     console.log('currentQuestion ', currentQuestion);
  //     this.localStorageService.addQuestion(currentQuestion);
  //   }
  // }

  // getAnswerOptions(answers: string): string[] {
  //   return answers.replace(/\s/g, '').split(',');
  // }

  // onChange(e: MatRadioChange): void {
  //   this.isAnswerOpen = e.value === 'open';
  //   this.updateValidation(this.isAnswerOpen);
  // }

  // updateValidation(isAnswerOpen: boolean): void {
  //   if (!isAnswerOpen) {
  //     this.questionForm.get('answers')?.setValidators(Validators.required);
  //   } else {
  //     this.questionForm.get('answers')?.clearValidators();
  //   }
  //   this.questionForm.get('answers')?.updateValueAndValidity();
  // }

  /////////////////////////FORM ARRAY

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
    answers: this.fb.array([
      this.fb.control('', [Validators.required]),
      this.fb.control('', [Validators.required]),
      this.fb.control('', [Validators.required]),
    ]),
  });

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }
  addAnswer() {
    this.answers.push(this.fb.control('', [Validators.required]));
  }

  removeAnswer(i: number): void {
    this.answers.removeAt(i);
  }

  onSubmit(): void {
    let currentQuestion = setQuestion(this.questionForm.value);
    this.localStorageService.addQuestion(currentQuestion);
    this.goToQuestions();
  }

  onChange(e: MatRadioChange): void {
    this.isAnswerOpen = e.value === 'open';
    this.updateValidation(this.isAnswerOpen, this.answers);
  }
}
