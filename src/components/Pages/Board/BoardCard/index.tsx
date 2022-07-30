import React from 'react';
import styles from './BoardCard.module.scss';
import { Draggable } from 'react-beautiful-dnd';

export const BoardCard: React.FC<{ title: any; id: string; index: number }> = ({
  title,
  id,
  index,
}) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: any) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.root}
          >
            <div className={styles.card}>{title}</div>
          </div>
        );
      }}
    </Draggable>
  );
};
