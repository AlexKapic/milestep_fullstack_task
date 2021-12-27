interface ITask {
  id: string;
  authorId: string;
  title: string;
  description: string;
  isDone?: boolean;
  priority: number;
  dueDate: Date;
}

export type { ITask };
