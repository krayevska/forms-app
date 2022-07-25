import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
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

  ngOnInit(): void {
    if (this.question) {
      this.options = this.question.answerOptions;

      const minTwoChecksValidator: AbstractControlOptions = {
        validators: this.minTwoChecks,
      };

      this.form = this.fb.group(
        {
          checkboxes: this.fb.group({}),
        },
        minTwoChecksValidator
      );

      const checkboxes = <FormGroup>this.form.get('checkboxes');

      this.options?.forEach((option: any) => {
        checkboxes.addControl(option, new FormControl(false));
      });
    }
  }

  private minTwoChecks(formGroup: AbstractControl): ValidationErrors | null {
    const checkboxesValues = Object.values(formGroup.value.checkboxes);
    const checked = checkboxesValues.filter((item) => item === true);
    return checked.length >= 2 ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.question) {
      this.localStorageService.answerQuestion(
        this.question,
        this.form?.value.checkboxes
      );
    }
  }
}
