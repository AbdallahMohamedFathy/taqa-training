export type Ratings = Record<string, number>;

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

/** One attendee signing in for a session. */
export type Attendance = {
  id: string;
  program_name: string;
  attended_on: string;
  name: string;
  department: string;
  created_at: string;
};
