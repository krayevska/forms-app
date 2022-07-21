import { Injectable } from '@angular/core';
import { Question } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

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
