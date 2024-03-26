interface Question {
    question: string;
    options: string[];
  }
  
  export interface QuestionsData {
    [questionId: string]: Question;
  }
  