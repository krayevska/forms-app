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

  updateQuestion(question: Question): void {
    let key = question.creationDate;
    let allQuestions = this.getQuestions();
    let index = allQuestions.findIndex((q) => q.creationDate === key);
    allQuestions[index] = question;
    localStorage.setItem('questions', JSON.stringify(allQuestions));
    localStorage.removeItem('questionToEdit');
  }

  deleteQuestion(question: Question): void {
    let key = question.creationDate;
    let allQuestions = this.getQuestions();
    let index = allQuestions.findIndex((q) => q.creationDate === key);
    allQuestions.splice(index, 1);
    localStorage.setItem('questions', JSON.stringify(allQuestions));
  }

  answerQuestion(question: Question, answer: any | any[]): void {
    let allQuestions = this.getQuestions();
    let key = question.creationDate;
    let index = allQuestions.findIndex((q) => q.creationDate === key);
    allQuestions[index].answer.answered = true;

    if (question.type === 'open') {
      allQuestions[index].answer.open = answer.answer;
    } else if (question.type === 'single') {
      allQuestions[index].answer.single = answer.options;
    } else {
      let answers = Object.keys(answer);
      allQuestions[index].answer.multi = answers.filter(
        (option: any) => answer[option] === true
      );
    }
    allQuestions[index].answer.date = new Date(Date.now()).toLocaleString();
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
    allQuestions[index].answer.date = undefined;
    localStorage.setItem('questions', JSON.stringify(allQuestions));
    this.statusChanges.next(key);
  }

  addQuestion(question: Question): void {
    let questions = this.getQuestions();
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
  }
}
