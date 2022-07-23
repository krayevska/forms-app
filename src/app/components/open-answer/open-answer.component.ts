import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Question } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-open-answer',
  templateUrl: './open-answer.component.html',
  styleUrls: ['./open-answer.component.css'],
})
export class OpenAnswerComponent implements OnInit {
  @Input() question?: Question;
  public options?: string[];
  public answerForm?: FormGroup;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      answer: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(10),
      ]),
    });
  }
  onSubmit(): void {
    if (this.question) {
      console.log('ANSWERFORM VAL ', this.answerForm?.value);
      this.localStorageService.answerQuestion(
        this.question,
        this.answerForm?.value
      );
    }
  }
}
