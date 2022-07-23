import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Question } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-multi-choice-answer',
  templateUrl: './multi-choice-answer.component.html',
  styleUrls: ['./multi-choice-answer.component.css'],
})
export class MultiChoiceAnswerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}
  @Input() question?: Question;
  public options?: string[];
  public form?: FormGroup;
  public isSubmitted = false;
  public checks = 0;

  ngOnInit(): void {
    if (this.question) {
      this.options = this.question.answerOptions;

      this.form = this.fb.group({
        checkboxes: this.fb.group({}),
      });

      const checkboxes = <FormGroup>this.form.get('checkboxes');

      this.options?.forEach((option: any) => {
        checkboxes.addControl(option, new FormControl(false));
      });
    }
  }

  onChangeAnswer(e: any): void {
    this.checks = e.target.checked ? this.checks + 1 : this.checks - 1;
  }

  disableSubmit(): boolean {
    return this.checks < 2;
  }

  onSubmit(): void {
    console.log(this.form?.value);
    this.isSubmitted = true;
    if (this.question) {
      this.localStorageService.answerQuestion(
        this.question,
        this.form?.value.checkboxes
      );
    }
  }
}
