import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DisplayComponent } from './components/display/display.component';
import { EditComponent } from './components/edit/edit.component';
import { ManagementComponent } from './components/management/management.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  { path: '', component: ManagementComponent },
  { path: 'edit', component: EditComponent },
  { path: 'create', component: CreateComponent },
  { path: 'display', component: DisplayComponent },
  { path: 'question/:mode', component: QuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
