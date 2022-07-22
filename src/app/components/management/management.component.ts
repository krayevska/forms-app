import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Question } from 'src/app/utils/interfaces';
import { DISPLAYED_COLUMNS } from '../../utils/constants';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  public questions: Question[] = [];
  public displayedColumns: string[] = DISPLAYED_COLUMNS;

  constructor(
    private router: Router,
    private localstorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.questions = this.localstorageService.getQuestions();
  }

  createQuestion(): void {
    console.log('createQuestion');
    this.router.navigate(['/create']);
  }

  editQuestion(question: Question): void {
    console.log('EDIT ', question);
    this.localstorageService.setQuestionForEdit(question);
    this.router.navigate(['/edit']);
  }

  goToDisplay(): void {
    this.router.navigate(['/display']);
  }

  deleteQuestion(question: Question): void {
    console.log(question);
    this.localstorageService.deleteQuestion(question);
    this.questions = this.localstorageService.getQuestions();
  }
}
