import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Boards.module.scss';
import { BoardСolumn } from '../../components/Pages/Board/BoardСolumn';
import { BoardButton } from '../../components/Pages/Board/BoardButton';

const boardColumn = [
  { title: 'Некий тайтл', id: 1 },
  { title: 'Некий тайтл 2', id: 2 },
];

export const Boards: React.FC = () => {
  const boardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    boardRef?.current?.addEventListener('click', (event) => {
      // console.log('board', event.clientX, event.clientY);
    });
  });

  let params = useParams();
  console.log(params);
  return (
    <div ref={boardRef} className={styles.root}>
      {boardColumn.map((column) => (
        <BoardСolumn key={column.id} {...column} />
      ))}
      <BoardButton imgType="board-plus" text="Добавьте ещё одну колонку" />
    </div>
  );
};
