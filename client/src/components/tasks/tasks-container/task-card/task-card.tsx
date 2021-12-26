import { ITask } from 'common/interfaces/task';
import { Button, Card } from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = {
  task: ITask;
  editHandler: (id: string) => void;
};

export const TaskCard: React.FC<Props> = ({ task, editHandler }) => {
  return (
    <Card className={styles.card} bg={task.isDone ? 'success' : 'secondary'}>
      <Card.Header className={styles.card_header}>
        {task.title}
        <div className={styles.card_body}>
          <Button
            className="me-5"
            variant={task.isDone ? 'success' : 'secondary'}
            onClick={(): void => editHandler(task.id)}
          >
            Edit <i className="bi bi-pencil"></i>
          </Button>
          <Button variant={task.isDone ? 'success' : 'secondary'}>
            Delete <i className="bi bi-trash"></i>
          </Button>
        </div>
      </Card.Header>
    </Card>
  );
};
