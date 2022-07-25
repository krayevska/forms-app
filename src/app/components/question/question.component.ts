import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from '../../services/local-storage.service';
import { setQuestion, editQuestion } from '../../utils/configFunctions';
import { Question } from 'src/app/utils/interfaces';
import { TEXTAREA_VALIDATORS } from '../../utils/constants';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  public isAnswerOpen = true;
  private editQuestion = editQuestion;
  private setQuestion = setQuestion;
  private numberOfOptions = 3;
  public mode?: string;
  public questionForm?: FormGroup;
  public currentQuestion?: Question;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mode = params['mode'];
      this.mode === 'create'
        ? this.setNewQuestionForm()
        : this.setEditQuestionForm();
    });
  }

  setNewQuestionForm(): void {
    this.questionForm = this.fb.group({
      text: ['', TEXTAREA_VALIDATORS],
      type: ['', Validators.required],
      answers: this.fb.array([]),
    });
  }

  setEditQuestionForm(): void {
    let question = this.localStorageService.getQuestionForEdit();
    if (question) {
      this.currentQuestion = JSON.parse(question);
      if (this.currentQuestion) {
        this.isAnswerOpen = this.currentQuestion.type === 'open';
        let answersControls: FormControl[] = [];
        this.currentQuestion.answerOptions?.forEach((option) => {
          if (option) {
            answersControls.push(this.fb.control(option));
          }
        });

        this.questionForm = this.fb.group({
          text: [this.currentQuestion.text, TEXTAREA_VALIDATORS],
          type: [this.currentQuestion.type, Validators.required],
          answers: this.fb.array(answersControls),
        });
      }
    }
  }

  get answers() {
    return this.questionForm?.get('answers') as FormArray;
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
    if (this.mode === 'create') {
      let currentQuestion = this.setQuestion(this.questionForm?.value);
      this.localStorageService.addQuestion(currentQuestion);
    } else {
      if (this.currentQuestion) {
        this.editQuestion(this.questionForm?.value, this.currentQuestion);
        this.localStorageService.updateQuestion(this.currentQuestion);
      }
    }
    this.goToManagmentPage();
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

  goToManagmentPage(): void {
    this.router.navigate(['']);
  }
}
