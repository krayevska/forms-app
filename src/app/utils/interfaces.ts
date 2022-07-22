import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface Question {
  text: string | null | undefined;
  type: string | null | undefined;
  creationDate: string;
  answerOptions: string[] | undefined;
  answer: string | undefined;
  answerOpen: string | undefined;
  answerDate: Date | undefined;
}

export interface Answer {
  open: string;
  option: string;
}

// export interface QuestionForm {
//   text: FormControl<string | null>;
//   type: FormControl<string | null>;
//   answers: FormArray<FormControl<string | null>>;
// }
