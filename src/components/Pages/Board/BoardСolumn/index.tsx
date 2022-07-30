import React from 'react';
import { BoardButton } from '../BoardButton';
import { BoardCard } from '../BoardCard';
import styles from './BoardСolumn.module.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export const BoardСolumn: React.FC<{
  title: string;
  id: string;
  index: number;
  cards: any;
}> = ({ title, id, index, cards }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: any) => (
        <div className={styles.root} ref={provided.innerRef} {...provided.draggableProps}>
          <div>
            <div className={styles.header} id={String(id)} {...provided.dragHandleProps}>
              <p>{<textarea placeholder={title} />}</p>
            </div>
            <Droppable droppableId={id} type={`droppableSubItem`}>
              {(provided: any) => (
                <div ref={provided.innerRef}>
                  <div className={styles.content}>
                    {cards.map((el: any, i: number) => {
                      return <BoardCard title={el.content} index={i} key={el.id} id={el.id} />;
                    })}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className={styles.button}>
            <BoardButton imgType="board-plus" text="Добавить карточку" />
          </div>
        </div>
      )}
    </Draggable>
  );
};
