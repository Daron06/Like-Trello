import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Messages } from './pages/Messages';
import { Boards } from './pages/Boards';
import { Calendar } from './pages/Calendar';
import { MainLayout } from './layouts/MainLayout';
import { Test } from './pages/Test';
import { detect, detectOS, browserName } from 'detect-browser';

const browser = detect();

console.log(detectOS(navigator.userAgent), browserName(navigator.userAgent));

const checkBrowser = () => {
  switch (browser && browser.name) {
    case 'yandexbrowser':
    case 'safari':
    case 'edge':
    case 'edge-chromium':
      return true;
    default:
      return false;
  }
};

function App() {
  console.log(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|IOS/i.test(
      detectOS(navigator.userAgent) || ''
    ),
    navigator.userAgent
  );

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${require('./assets/img/kosmos-big.jpg')})` }}
    >
      {/* <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/b/:id" element={<Boards />} />
          <Route path="/c/:id" element={<Boards />} />
        </Routes>
      </MainLayout> */}
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
