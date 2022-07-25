import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Boards.module.scss';
import { BoardСolumn } from '../../components/Pages/Board/BoardСolumn';
import { BoardButton } from '../../components/Pages/Board/BoardButton';

export const Boards: React.FC = () => {
  let params = useParams();
  const [positionEl, setPositionEl] = React.useState([
    {
      title: 'Некий тайтл',
      id: '1/column/d&d',
      pos: {
        top: 0,
        left: 0,
        abs: false,
        heightEl: 0,
        zI: 1000,
      },
    },
    {
      title: 'Некий тайтл 2',
      id: '2/column/d&d',
      pos: {
        top: 0,
        left: 0,
        abs: false,
        heightEl: 0,
        zI: 1000,
      },
    },
  ]);

  const cardRef = React.useRef<any>(null);

  function onMouseEvent(event: any) {
    if (!event?.target?.id?.includes('/column/d&d')) {
      return;
    }

    let shiftX = event.clientX - event.target.getBoundingClientRect().left;
    let shiftY = event.clientY - event.target.getBoundingClientRect().top;

    function moveAt(pageX: number, pageY: number) {
      if (event.target) {
        setPositionEl((prev) =>
          prev.map((el) =>
            el.id === event.target.id
              ? {
                  ...el,
                  pos: {
                    left: pageX - shiftX,
                    top: pageY - shiftY,
                    abs: true,
                    heightEl: event.target?.clientHeight,
                    zI: 2000,
                  },
                }
              : el
          )
        );
      }
    }

    function onMouseMove(e: any) {
      moveAt(e.pageX, e.pageY);
    }
    function onMouseOut(e: any) {
      if (e.target?.id?.includes('/column/d&d')) {
        console.log(event.target.id, e.target.id, e.relatedTarget.id);
      }
    }

    document.addEventListener('mouseout', onMouseOut);

    // передвигаем  при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    //  удалить ненужные обработчики
    document.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseOut);
      event.target.onmouseup = null;
      setPositionEl((prev) =>
        prev.map((el) => ({
          ...el,
          pos: {
            top: 0,
            left: 0,
            abs: false,
            heightEl: 0,
            zI: 1000,
          },
        }))
      );
    };
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', onMouseEvent);

    return () => document.removeEventListener('mousedown', onMouseEvent);
  }, []);

  return (
    <div className={styles.root}>
      {positionEl.map((column) => (
        <BoardСolumn cardRef={cardRef} positionEl={column.pos} key={column.id} {...column} />
      ))}
      <BoardButton imgType="board-plus" text="Добавьте ещё одну колонку" />
    </div>
  );
};
