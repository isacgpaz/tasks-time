export type Task = {
  id: string;
  title: string;
  time: number;
  isCompleted: boolean;
  category?: string;
  description?: string;
};
