import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Question } from 'src/app/utils/interfaces';
import { editQuestion, updateValidation } from '../../utils/configFunctions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public questionForm?: FormGroup;
  public question?: Question;
  public isAnswerOpen?: boolean;
  public updateValidation = updateValidation;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let question = this.localStorageService.getQuestionForEdit();
    if (question) {
      this.question = JSON.parse(question);
      if (this.question) {
        this.setForm(this.question);
        this.isAnswerOpen = this.question.type === 'open';
      }
    }
  }

  setForm(question: Question) {
    let answersControls: FormControl[] = [];
    let currentAnswers = question.answerOptions;
    currentAnswers?.forEach((option) => {
      answersControls.push(this.fb.control(option, [Validators.required]));
    });

    this.questionForm = this.fb.group({
      text: [
        question.text,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(10),
        ],
      ],
      type: [question.type, Validators.required],
      answers: this.fb.array(answersControls),
    });
    console.log('this.questionForm ', this.questionForm);
  }

  get answers() {
    return this.questionForm?.get('answers') as FormArray;
  }

  goToQuestions(): void {
    this.router.navigate(['']);
  }

  onSubmit(): void {
    let editedQ: Question;
    if (this.question) {
      editedQ = editQuestion(this.questionForm?.value, this.question);
      this.localStorageService.editQuestion(this.question);
    }
    this.goToQuestions();
  }

  onChange(e: MatRadioChange): void {
    this.isAnswerOpen = e.value === 'open';
    this.updateValidation(this.isAnswerOpen, this.answers);
  }

  addAnswer() {
    this.answers.push(this.fb.control('', [Validators.required]));
  }

  removeAnswer(i: number): void {
    this.answers.removeAt(i);
  }
}
