import React from 'react';
import { Icon, IconName } from '../../../Icon';
import styles from './BoardButton.module.scss';

interface BoardButtonProps {
  text: string;
  imgType?: IconName;
}

export const BoardButton: React.FC<BoardButtonProps> = ({ text, imgType }) => {
  return (
    <div className={styles.root}>
      <a>
        {imgType && <Icon type={imgType} />}
        <span>{text}</span>
      </a>
    </div>
  );
};
