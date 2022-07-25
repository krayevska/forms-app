import { Validators } from '@angular/forms';

export const DISPLAYED_COLUMNS = [
  'text',
  'type',
  'creationDate',
  'edit',
  'delete',
];

export const TEXTAREA_VALIDATORS = [
  Validators.required,
  Validators.maxLength(100),
  Validators.minLength(3),
];
