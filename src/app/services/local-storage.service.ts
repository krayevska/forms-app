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
