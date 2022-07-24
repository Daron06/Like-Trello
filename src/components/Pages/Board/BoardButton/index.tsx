import React from 'react';
import { Icon } from '../../../Icon';
import styles from './BoardButton.module.scss';

interface BoardButtonProps {
  text: string;
  Img?: React.ReactNode;
}

export const BoardButton: React.FC<BoardButtonProps> = ({ text, Img }) => {
  return (
    <div className={styles.root}>
      <a>
        {<Icon type="board-plus" />}
        {text}
      </a>
    </div>
  );
};
