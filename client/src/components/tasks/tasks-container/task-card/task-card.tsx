import { ITask } from 'common/interfaces/task';
import { SyntheticEvent } from 'react';
import { Button, Card } from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = {
  task: ITask;
  editHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
};

export const TaskCard: React.FC<Props> = ({
  task,
  editHandler,
  deleteHandler,
}) => {
  const editTask = (e: SyntheticEvent, id: string): void => {
    e?.stopPropagation();
    editHandler(id);
  };
  const deleteTask = (e: SyntheticEvent, id: string): void => {
    e?.stopPropagation();
    deleteHandler(id);
  };

  return (
    <Card className={styles.card} bg={task.isDone ? 'success' : 'secondary'}>
      <Card.Header className={styles.card_header}>
        {task.title}
        <div className={styles.card_body}>
          <Button
            className="me-5"
            variant={task.isDone ? 'success' : 'secondary'}
            onClick={(e): void => editTask(e, task.id)}
          >
            Edit <i className="bi bi-pencil"></i>
          </Button>
          <Button
            variant={task.isDone ? 'success' : 'secondary'}
            onClick={(e): void => deleteTask(e, task.id)}
          >
            Delete <i className="bi bi-trash"></i>
          </Button>
        </div>
      </Card.Header>
    </Card>
  );
};
