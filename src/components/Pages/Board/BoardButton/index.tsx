import React from 'react';
import { Icon, IconName } from '../../../Icon';
import styles from './BoardButton.module.scss';

type BoardButtonProps = {
  text: string;
  imgType?: IconName;
  onClick: () => void;
};

export const BoardButton: React.FC<BoardButtonProps> = ({ text, imgType, onClick }) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <a>
        {imgType && <Icon type={imgType} />}
        <span>{text}</span>
      </a>
    </div>
  );
};
