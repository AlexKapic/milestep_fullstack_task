import { ITask } from 'common/interfaces/task';
import moment from 'moment';
import { Button, Card } from 'react-bootstrap';

type Props = {
  task: ITask | null;
  toggleDone: (arg: { isDone: boolean; id: string }) => void;
};

export const TaskInfoCard: React.FC<Props> = ({ task, toggleDone }) => {
  return (
    <Card bg={task?.isDone ? 'success' : 'light'}>
      <Card.Header>
        <Card.Title>{task?.title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Title>Description:</Card.Title>
        <Card.Text className="description">{task?.description}</Card.Text>
        <Card.Text className="priority">Priority: {task?.priority}</Card.Text>
        <Card.Text className="priority">
          Due date: {moment(task?.dueDate).format('YYYY-MM-DD')}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={(): void =>
            toggleDone({ isDone: !task?.isDone, id: task?.id as string })
          }
        >
          Mark as {task?.isDone ? 'NOT DONE' : 'DONE'}
        </Button>
      </Card.Footer>
    </Card>
  );
};
