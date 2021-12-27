interface ISortTask {
  isDone?: 'ASC' | 'DESC';
  dueDate?: 'ASC' | 'DESC';
  priority?: 'ASC' | 'DESC';
}

export type { ISortTask };
