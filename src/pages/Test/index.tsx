import React from 'react';
import s from './Test.module.scss';

export const Test = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <div className={s.root}>
      <header>
        <button onClick={() => setOpen((prev) => !prev)}>click</button>
      </header>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={open ? `${s.primaryMenu} ${s.primaryMenu__open}` : s.primaryMenu}>
            nav
          </div>
        </div>
        <div className={s.content}>content</div>
      </div>
    </div>
  );
};
