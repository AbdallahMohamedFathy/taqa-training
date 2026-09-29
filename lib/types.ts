export type Ratings = Record<string, number>;

/** A course name HR maintains; trainees pick from these in the form. */
export type Program = {
  id: string;
  name: string;
  created_at: string;
};

/** One trainee's evaluation. The program header is typed by the trainee. */
export type Submission = {
  id: string;
  program_name: string;
  program_date: string;
  instructors: string[];
  trainee_name: string | null;
  ratings: Ratings;
  recommendations: string | null;
  created_at: string;
};
