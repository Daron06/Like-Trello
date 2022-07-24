import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Nav.module.scss';

const navRoutes = [
  { path: '/', title: 'Home', svg: <Icon type="home-logo" /> },
  { path: '/messages', title: 'Участники', svg: <Icon type="nav-user" /> },
  { path: '/calendar', title: 'Calendar', svg: <Icon type="nav-calendar" /> },
];

const boardRoutes = [
  {
    path: '/b/tewe2',
    title: 'Test Board',
    img: `url(${require('../../assets/img/kosmos-small.jpg')})`,
  },
  {
    path: '/b/teasd2312',
    title: 'Test Board 2',
    img: `url(${require('../../assets/img/bird-small.jpg')})`,
  },
];

export const Nav: React.FC = () => {
  return (
    <nav className={styles.root}>
      <ul>
        {navRoutes.map(route => (
          <li key={route.title}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : undefined)}
              to={route.path}
            >
              <div className={styles.logoWrapper}>{route.svg}</div>
              {route.title}
            </NavLink>
          </li>
        ))}
        <div className={styles.titleWrapper}>
          <h2>Мои доски</h2>
          <button>
            <span>
              <Icon type="board-plus" />
            </span>
          </button>
        </div>
        {boardRoutes.map(route => (
          <li key={route.title}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : undefined)}
              to={route.path}
            >
              <div className={styles.bgcImage} style={{ backgroundImage: route.img }}></div>
              {route.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
