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
  const [state, setState] = React.useState<{ display: 'block' | 'none' }>({
    display: 'block',
  });

  const [height, setHeight] = React.useState<{ height: number }>({
    height: 20,
  });

  const [areaValue, setAreaValue] = React.useState('');

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const onGetInputFocus = () => {
    setState({ display: 'none' });
    textareaRef.current?.focus();
  };

  const onBlurTextarea = () => {
    setState({ display: 'block' });
  };

  const onChangeValue = (e: any) => {
    console.log(Math.round(e.target.textLength / 31));
    setAreaValue(e.target.value);
    setHeight({
      height: 20 * (Math.trunc(e.target.textLength / 31) + 1),
    });
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: any) => (
        <div className={styles.root} ref={provided.innerRef} {...provided.draggableProps}>
          <div>
            <div className={styles.header} id={String(id)} {...provided.dragHandleProps}>
              <div onMouseUp={onGetInputFocus} className={styles.editingTarget} style={state}></div>
              <textarea
                className={styles.textarea}
                onBlur={onBlurTextarea}
                ref={textareaRef}
                placeholder={title}
                style={{ height: height.height + 8 }}
                onChange={onChangeValue}
                value={areaValue}
              />
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
                  <div className={styles.button}>
                    <BoardButton imgType="board-plus" text="Добавить карточку" />
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};
