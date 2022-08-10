import React from 'react';
import { BoardButton } from '../BoardButton';
import { BoardCard } from '../BoardCard';
import styles from './BoardСolumn.module.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../../../hooks';
import { addCard, changeTitleСolumn } from '../../../../features/board/boardSlice';

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

  const [areaValue, setAreaValue] = React.useState(title);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const onGetInputFocus = () => {
    setState({ display: 'none' });
    textareaRef.current?.select();
  };

  const onBlurTextarea = () => {
    setState({ display: 'block' });
    if (areaValue !== '') {
      dispatch(changeTitleСolumn({ index, text: areaValue }));
    } else {
      setAreaValue(title);
    }
  };

  const onChangeValue = (e: any) => {
    setAreaValue(e.target.value);
    setHeight({
      height: 20 * (Math.trunc(e.target.textLength / 31) + 1),
    });
  };

  const handleAddCard = () => {
    dispatch(addCard({ index, text: 'New Card' }));
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
                      return (
                        <BoardCard
                          title={el.content}
                          parentIndex={index}
                          index={i}
                          key={el.id}
                          id={el.id}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                  <div className={styles.button}>
                    <BoardButton
                      imgType="board-plus"
                      text="Добавить карточку"
                      onClick={handleAddCard}
                    />
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
