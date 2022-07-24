import React from 'react';
import { BoardButton } from '../BoardButton';
import { BoardCard } from '../BoardCard';
import styles from './BoardСolumn.module.scss';

export const BoardСolumn: React.FC<{ title: string; id: number }> = ({ title, id }) => {
  const [positionEl, setPositionEl] = React.useState({ top: 0, left: 0, abs: false });
  const cardRef = React.useRef<any>(null);

  function onMouseEvent(event: any) {
    let shiftX = event.clientX - cardRef.current.getBoundingClientRect().left;
    let shiftY = event.clientY - cardRef.current.getBoundingClientRect().top;

    function moveAt(pageX: number, pageY: number) {
      if (cardRef.current) {
        setPositionEl({
          left: pageX - shiftX,
          top: pageY - shiftY,
          abs: true,
        });
      }
    }

    function onMouseMove(e: any) {
      moveAt(e.pageX, e.pageY);
    }

    // передвигаем  при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    //  удалить ненужные обработчики
    cardRef.current.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      cardRef.current.onmouseup = null;
    };
  }

  React.useEffect(() => {
    const mouseEvent = cardRef.current;
    mouseEvent?.addEventListener('mousedown', onMouseEvent);

    return () => mouseEvent?.removeEventListener('mousedown', onMouseEvent);
  }, []);
  return (
    <div
      ref={cardRef}
      style={{
        top: positionEl.top,
        left: positionEl.left,
        position: positionEl.abs ? 'absolute' : 'relative',
      }}
      className={styles.root}
    >
      <div>
        <div className={styles.header}>
          <p>{<textarea value={title} />}</p>
        </div>
        <div className={styles.content}>
          <BoardCard />
          <BoardCard />
        </div>
      </div>
      <div className={styles.button}>
        <BoardButton imgType="board-plus" text="Добавить карточку" />
      </div>
    </div>
  );
};
