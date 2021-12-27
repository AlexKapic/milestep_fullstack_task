import { Modal as BSModal } from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = {
  show?: boolean;
  title?: string;
  children?: string | JSX.Element | JSX.Element[];
  size?: 'sm' | 'lg' | 'xl';
  onHide: () => void;
};

export const Modal: React.FC<Props> = ({
  show = false,
  title = '',
  children,
  size,
  onHide,
}) => (
  <BSModal
    show={show}
    size={size}
    contentClassName="border-0"
    centered
    onHide={onHide}
  >
    <BSModal.Header className={styles.header}>
      <BSModal.Title className={styles.title}>{title}</BSModal.Title>
    </BSModal.Header>

    <BSModal.Body className={styles.body}>{children}</BSModal.Body>
  </BSModal>
);
