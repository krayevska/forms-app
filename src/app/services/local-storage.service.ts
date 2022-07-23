import { Injectable } from '@angular/core';
import { Question, Answer } from '../utils/interfaces';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  private statusChanges = new BehaviorSubject('');
  updateQuestionsDisplay = this.statusChanges.asObservable();

  getQuestions(): Question[] {
    let data = localStorage.getItem('questions');
    return data ? JSON.parse(data) : [];
  }

  setQuestionForEdit(question: Question): void {
    localStorage.setItem('questionToEdit', JSON.stringify(question));
  }

  getQuestionForEdit(): string | null {
    return localStorage.getItem('questionToEdit');
  }

  editQuestion(question: Question): void {
    console.log('SERVISE EDIT ', question);
    let key = question.creationDate;
    let allQuestions = this.getQuestions();
    let index = allQuestions.findIndex((q) => q.creationDate === key);
    console.log('allQuestions ', allQuestions);
    console.log('index ', index);
    allQuestions[index] = question;
    console.log('allQuestions after ', allQuestions);
    localStorage.setItem('questions', JSON.stringify(allQuestions));
  }

  deleteQuestion(question: Question): void {
    console.log('DELETE ', question);

    let key = question.creationDate;
    let allQuestions = this.getQuestions();
    let index = allQuestions.findIndex((q) => q.creationDate === key);
    console.log('INDEX ', index);
    allQuestions.splice(index, 1);

    localStorage.setItem('questions', JSON.stringify(allQuestions));
  }

  // answer: {
  //   answerd: false,
  //   open: undefined,
  //   single: undefined,
  //   multi: undefined,
  // },

  answerQuestion(question: Question, answer: any | any[]): void {
    debugger;
    let allQuestions = this.getQuestions();
    let key = question.creationDate;
    let index = allQuestions.findIndex((q) => q.creationDate === key);
    allQuestions[index].answer.answered = true;
    console.log('allQuestions[index] B ', allQuestions[index]);
    if (question.type === 'open') {
      allQuestions[index].answer.open = answer.open;
    } else if (question.type === 'single') {
      allQuestions[index].answer.single = answer.option;
    } else {
      debugger;
      let answers = Object.keys(answer);
      debugger;
      allQuestions[index].answer.multi = answers.filter(
        (option: any) => answer[option] === true
      );
    }
    console.log('allQuestions[index] A ', allQuestions[index]);
    localStorage.setItem('questions', JSON.stringify(allQuestions));
    this.statusChanges.next(key);
  }

  makeUnanswered(question: Question): void {
    let allQuestions = this.getQuestions();
    let key = question.creationDate;
    let index = allQuestions.findIndex((q) => q.creationDate === key);
    allQuestions[index].answer.answered = false;
    allQuestions[index].answer.open = undefined;
    allQuestions[index].answer.single = undefined;
    allQuestions[index].answer.multi = undefined;
    localStorage.setItem('questions', JSON.stringify(allQuestions));
    this.statusChanges.next(key);
  }

  addQuestion(question: Question): void {
    let questions: Question[];
    let data = localStorage.getItem('questions');
    if (data) {
      questions = JSON.parse(data);
      questions.push(question);
      localStorage.setItem('questions', JSON.stringify(questions));
    } else {
      questions = [question];
      localStorage.setItem('questions', JSON.stringify(questions));
    }
    //localStorage.setItem('questions', JSON.stringify(questions));
  }
}
