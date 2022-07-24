import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as LogoHome } from '../../assets/svg/home-nav.svg';
export const Header = () => {
  return (
    <header className={styles.root}>
      <LogoHome />
      Header
    </header>
  );
};
