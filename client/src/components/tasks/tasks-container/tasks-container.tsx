import { ITask } from 'common/interfaces/task';
import { Col, Container, Row } from 'react-bootstrap';
import { TaskCard } from './task-card';

type Props = {
  tasks?: ITask[];
  editHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
  showInfoCard: (id: string) => void;
};

export const TaskContainer: React.FC<Props> = ({
  tasks,
  editHandler,
  deleteHandler,
  showInfoCard,
}) => {
  return (
    <Container className="mt-4">
      <Row>
        {tasks?.map((task) => (
          <Col
            onClick={(): void => showInfoCard(task.id)}
            key={task.id}
            md={12}
            className="mb-4 btn fs-4"
          >
            <TaskCard
              task={task}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
