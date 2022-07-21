export interface Question {
  text: string | null | undefined;
  type: string | null | undefined;
  creationDate: Date;
  answerOptions: string[] | [];
  answerDate: Date | null;
}
