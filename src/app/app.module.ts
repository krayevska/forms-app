import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementComponent } from './components/management/management.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { DisplayComponent } from './components/display/display.component';
import { AnswerFormComponent } from './components/answer-form/answer-form.component';
import { MultiChoiceAnswerComponent } from './components/multi-choice-answer/multi-choice-answer.component';
import { SingleChoiseAnswerComponent } from './components/single-choise-answer/single-choise-answer.component';
import { OpenAnswerComponent } from './components/open-answer/open-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagementComponent,
    EditComponent,
    CreateComponent,
    DisplayComponent,
    AnswerFormComponent,
    MultiChoiceAnswerComponent,
    SingleChoiseAnswerComponent,
    OpenAnswerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
