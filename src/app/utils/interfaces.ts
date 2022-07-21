export interface Question {
  text: string | null | undefined;
  type: string | null | undefined;
  creationDate: string;
  answerOptions: (string | null)[] | undefined;
  answerDate: Date | null;
}
