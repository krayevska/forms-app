export interface Question {
  text: string;
  type: 'single' | 'multi' | 'open';
  creationDate: Date;
  answer: string;
  answerDate: Date;
}
