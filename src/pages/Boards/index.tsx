import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Boards.module.scss';
import { BoardСolumn } from '../../components/Pages/Board/BoardСolumn';
import { BoardButton } from '../../components/Pages/Board/BoardButton';
import { ReactComponent as PlusLogo } from '../../assets/svg/plus.svg';

export const Boards: React.FC = () => {
  let params = useParams();
  console.log(params);
  return (
    <div className={styles.root}>
      <BoardСolumn />
      <BoardСolumn />
      <BoardButton Img={PlusLogo} text="Добавьте ещё одну колонку" />
    </div>
  );
};
