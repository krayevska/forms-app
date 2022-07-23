import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Question } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {}
  public unansweredQuestions?: Question[];
  public answeredQuestions?: Question[];
  public answersForm?: FormGroup;

  ngOnInit(): void {
    this.filterQuestions();
    // let questions = this.localStorageService.getQuestions();
    // console.log('questions ', questions);
    // this.unansweredQuestions = questions.filter(
    //   (question) =>
    //     (question.answerOpen === undefined || question.answerOpen === null) &&
    //     question.answer === undefined
    // );

    // this.answeredQuestions = questions.filter(
    //   (question) =>
    //     question.answerOpen !== undefined || question.answer !== undefined
    // );
    // console.log('unansweredQuestions ', this.unansweredQuestions);
    // console.log('answeredQuestions ', this.answeredQuestions);
    this.localStorageService.updateQuestionsDisplay.subscribe(() => {
      this.filterQuestions();
    });
  }

  filterQuestions(): void {
    let questions = this.localStorageService.getQuestions();
    console.log('questions ', questions);
    this.unansweredQuestions = questions.filter(
      (question) => question.answer.answered === false
    );

    this.answeredQuestions = questions.filter(
      (question) => question.answer.answered === true
    );
    console.log('this.unansweredQuestions ', this.unansweredQuestions);
    console.log('this.answeredQuestions ', this.answeredQuestions);
  }

  goToQuestions(): void {
    this.router.navigate(['']);
  }

  onSubmit(): void {
    console.log(this.answersForm?.value);
  }

  makeUnanswered(question: Question): void {
    this.localStorageService.makeUnanswered(question);
  }

  typeIsMulti(q: Question): boolean {
    return q.type === 'multi';
  }
}
