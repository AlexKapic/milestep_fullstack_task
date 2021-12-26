interface ITaskCreate {
  title: string;
  description: string;
  isDone?: boolean;
  priority: number;
  dueDate: Date;
}

export type { ITaskCreate };
