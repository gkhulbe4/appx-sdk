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

export type QuizAttemptQuestion = {
  id: string;
  quiz_id: string;
  question: string;
  question_image: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  option_image_1: string;
  option_image_2: string;
  option_image_3: string;
  option_image_4: string;
  option_image_5: string;
  answer: string;
  correct_score: string;
  negative_score: string;
  deleted: string;
  difficulty_level: string;
  solution_heading: string;
  solution_text: string;
  solution_image: string;
  solution_video: string;
  sortingparam: string;
};
