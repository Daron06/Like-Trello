import React from 'react';
import { BoardButton } from '../BoardButton';
import { BoardCard } from '../BoardCard';
import styles from './BoardСolumn.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const BoardСolumn: React.FC<{
  title: string;
  id: string;
  index: number;
  cards: any;
}> = ({ title, id, index, cards }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          className={styles.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <div className={styles.header} id={String(id)}>
              <p>{<textarea placeholder={title} />}</p>
            </div>
            <div className={styles.content}>
              {cards.map((el: any, index: number) => (
                <BoardCard title={el.title} index={index} key={el.id} id={el.id} />
              ))}
            </div>
          </div>
          <div className={styles.button}>
            <BoardButton imgType="board-plus" text="Добавить карточку" />
          </div>
        </div>
      )}
    </Draggable>
  );
};
