import { ReactNode } from 'react';
import styles from './BoardСolumnPapper.module.scss';

export const BoardСolumnPapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
