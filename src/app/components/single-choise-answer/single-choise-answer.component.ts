import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Question } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-single-choise-answer',
  templateUrl: './single-choise-answer.component.html',
  styleUrls: ['./single-choise-answer.component.css'],
})
export class SingleChoiseAnswerComponent implements OnInit {
  @Input() question?: Question;
  public options?: string[];
  public answersForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.question) {
      console.log('QUESTION FROM S ', this.question);
      this.options = this.question.answerOptions;
      this.answersForm = this.fb.group({
        options: ['', Validators.required],
      });
    }
  }

  onSubmit(): void {
    //this.isSubmitted = true;
    console.log('SINGLE ', this.answersForm?.value);
    if (this.question) {
      this.localStorageService.answerQuestion(
        this.question,
        this.answersForm?.value
      );
    }
  }
}
