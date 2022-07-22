import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface Question {
  text: string | null | undefined;
  type: string | null | undefined;
  creationDate: string;
  answerOptions: (string | null)[] | undefined;
  answerOpen: string | null;
  answerDate: Date | null;
}

// export interface QuestionForm {
//   text: FormControl<string | null>;
//   type: FormControl<string | null>;
//   answers: FormArray<FormControl<string | null>>;
// }
