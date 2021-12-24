import { Button } from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = {
  name?: string;
  signOut: () => Promise<void>;
};

export const Header: React.FC<Props> = ({ name, signOut }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_clear}></div>
      <div className={styles.header_title}>Task Management System</div>
      <div className={styles.header_menu}>
        <div className={styles.header_menu_username}>{name}</div>
        <Button onClick={signOut}>
          SignOut<i className="bi bi-box-arrow-right ms-2"></i>
        </Button>
      </div>
    </header>
  );
};
