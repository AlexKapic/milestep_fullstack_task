import { Button, Col, Container, Row } from 'react-bootstrap';

type Props = {
  addHandler: () => void;
};

export const TaskManagament: React.FC<Props> = ({ addHandler }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={(): void => addHandler()}>Create task</Button>
        </Col>
      </Row>
    </Container>
  );
};
