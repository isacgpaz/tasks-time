export type Task = {
  id: string;
  title: string;
  time: number;
  isCompleted: boolean;
  category?: string;
  description?: string;
  finishedAt?: string;
};

export type TaskWithTimeFormatted = Task & {
  fullTime: string;
};
