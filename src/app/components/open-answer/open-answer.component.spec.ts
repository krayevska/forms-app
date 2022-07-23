import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAnswerComponent } from './open-answer.component';

describe('OpenAnswerComponent', () => {
  let component: OpenAnswerComponent;
  let fixture: ComponentFixture<OpenAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
