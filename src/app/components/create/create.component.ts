import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  createForm = new FormGroup({
    text: new FormControl(''),
    type: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.createForm.value);
  }
}
