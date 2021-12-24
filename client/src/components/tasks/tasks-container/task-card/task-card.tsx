import { ITask } from 'common/interfaces/task';
import { Card } from 'react-bootstrap';

type Props = {
  task: ITask;
};

export const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <Card bg={task.isDone ? 'success' : 'light'}>
      <Card.Header>{task.title}</Card.Header>
    </Card>
  );
};
