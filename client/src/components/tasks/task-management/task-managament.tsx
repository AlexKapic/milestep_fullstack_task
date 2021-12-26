import { ISortTask } from 'common/interfaces/task';
import { useAppDispatch, useEffect, useState } from 'hooks/hooks';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { taskActions } from 'store/tasks';

type Props = {
  addHandler: () => void;
};

export const TaskManagament: React.FC<Props> = ({ addHandler }) => {
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<ISortTask>({ isDone: 'ASC' });

  const sort = (order: keyof ISortTask): void => {
    sortBy[order] === 'ASC'
      ? setSortBy({ [order]: 'DESC' })
      : setSortBy({ [order]: 'ASC' });
  };

  useEffect(() => {
    dispatch(taskActions.getTasks({ sortBy }));
  }, [sortBy]);

  return (
    <Container className="mt-3">
      <Row>
        <Col
          lg={6}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="fs-4 fw-bold">Sort by:</div>
          <Button onClick={(): void => sort('isDone')} active={!!sortBy.isDone}>
            {sortBy.isDone === 'ASC' ? 'Complited' : 'Active'}
          </Button>
          <Button
            onClick={(): void => sort('dueDate')}
            active={!!sortBy.dueDate}
          >
            {sortBy.dueDate === 'ASC' ? 'Duration ▼' : 'Duration ▲'}
          </Button>
          <Button
            onClick={(): void => sort('priority')}
            active={!!sortBy.priority}
          >
            {sortBy.priority === 'ASC' ? 'Priority ▼' : 'Priority ▲'}
          </Button>
        </Col>
        <Col lg={6} className="d-flex justify-content-end align-items-center">
          <Button onClick={(): void => addHandler()}>Create task</Button>
        </Col>
      </Row>
    </Container>
  );
};
