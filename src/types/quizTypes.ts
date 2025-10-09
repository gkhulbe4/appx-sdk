export type QuizUniqueResponse = {
  status: number;
  msg: string;
  message: string;
  data: {
    exam: string;
  }[];
};

export type QuizTitle = {
  id: string;
  title: string;
  image: string;
  exam: string;
  time: string;
  marks: string;
  pdf_link: string;
  quiz_solutions_video: string;
  show_explanation: string;
  show_instant_solution: string;
  show_rank: string;
  show_results: string;
  show_solutions: string;
  show_solutions_video: string;
  shuffle_questions: string;
  datetimestart: string;
  datetimeend: string;
  datetime: string;
  checkattempt: string;
  totalquestion: number;
};

export type QuizTitleResponse = {
  status: number;
  msg: string;
  message: string;
  total: number;
  data: QuizTitle[];
};
