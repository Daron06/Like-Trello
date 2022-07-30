import React from 'react';
import styles from './BoardCard.module.scss';
export const BoardCard: React.FC<{ title: any; id: string; index: number }> = ({
  title,
  id,
  index,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>{title}</div>
    </div>
  );
};
