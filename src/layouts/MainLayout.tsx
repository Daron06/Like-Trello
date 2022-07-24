import React, { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Nav } from '../components/Nav';
import styles from './MainLayout.module.scss';
export const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <Nav />
      {children}
    </div>
  );
};
