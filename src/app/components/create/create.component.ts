import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service';
import { setQuestion, updateValidation } from '../../utils/configFunctions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public isAnswerOpen = true;
  public updateValidation = updateValidation;
  public numberOfOptions = 3;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  goToQuestions(): void {
    this.router.navigate(['']);
  }

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
    answers: this.fb.array([]),
  });

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.fb.control('', [Validators.required]));
    this.numberOfOptions++;
  }

  removeAnswer(i: number): void {
    this.answers.removeAt(i);
    this.numberOfOptions--;
  }

  onSubmit(): void {
    let currentQuestion = setQuestion(this.questionForm.value);
    this.localStorageService.addQuestion(currentQuestion);
    this.goToQuestions();
  }

  onChange(e: MatRadioChange): void {
    this.isAnswerOpen = e.value === 'open';
    if (!this.isAnswerOpen && this.answers.controls.length === 0) {
      [...Array(3)].forEach((i) => {
        this.addAnswer();
      });
    } else if (this.isAnswerOpen) {
      [...Array(this.numberOfOptions)].forEach((i) => this.removeAnswer(i));
    }
  }
}
