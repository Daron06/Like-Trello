import React from 'react';
import { BoardButton } from '../BoardButton';
import { BoardCard } from '../BoardCard';
import styles from './BoardСolumn.module.scss';

export const BoardСolumn: React.FC<{
  title: string;
  id: string;
  positionEl: any;
  cardRef: any;
}> = ({ title, positionEl, id }) => {
  return (
    <>
      {positionEl.abs && (
        <div
          style={{
            width: 272,
            height: positionEl.heightEl,
            backgroundColor: '#172b4d',
          }}
        ></div>
      )}
      <div
        style={{
          top: positionEl.top,
          left: positionEl.left,
          position: positionEl.abs ? 'absolute' : 'relative',
          transform: positionEl.abs ? 'rotate(2deg)' : 'none',
          zIndex: positionEl.zI,
        }}
        className={styles.root}
      >
        <div>
          <div className={styles.header} id={String(id)}>
            <p>{<textarea placeholder={title} />}</p>
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
    </>
  );
};
