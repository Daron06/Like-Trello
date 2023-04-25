import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Messages } from './pages/Messages';
import { Boards } from './pages/Boards';
import { Calendar } from './pages/Calendar';
import { MainLayout } from './layouts/MainLayout';
import { Test } from './pages/Test';
import d from 'detect.js';
const arr = ['89851234567', '88005555777', '84957556983', '848221234567', '84842575018'];

const phoneFormatSettings = {
  defaultPattern: /(\+7|7|8)(\d{3})(\d{3})(\d{2})(\d{2})/g,
  defaultFormat: '+7 ($2) $3-$4-$5',
  '4842': {
    pattern: /(\+7|7|8)(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g,
    format: '+7 ($2-$3) $4-$5-$6',
  },
  '4822': {
    pattern: /(\+7|7|8)(\d{4})(\d{3})(\d{2})(\d{2})/g,
    format: null,
  },
  '800': {
    pattern: null,
    format: '8 ($2) $3-$4-$5',
  },
};

console.log(d.parse(navigator.userAgent), navigator);
const { userAgent } = navigator;
if (userAgent.includes('Edg') || userAgent.includes('YaBrowser')) {
  console.log(true);
}

function App() {
  const maskPhoneNumber = (phone: string) =>
    phone.replace(
      /^(?:\+7|8)(\s\(\d{3}\)|\s\(\d{4}\)|\s\(\d{2}-\d{2}\))\s(\d{1,4})\s?(-)?(\d{2})-(\d{2})$/,
      (match, p1, p2, p3, _, p5) =>
        (match.startsWith('8') && p1.includes('800') ? '8' : '+7') +
        p1 +
        ' ' +
        '*'.repeat(p2.length) +
        (p3 ? '-' : '') +
        '**-' +
        p5
    );

  const formatterPhoneNumber = (phone: string, isMasked?: boolean): string => {
    if (phone.length < 8) {
      return phone;
    }

    if (phone.startsWith('+')) {
      phone = phone.slice(1);
    }

    const setting =
      phoneFormatSettings[phone.slice(1, 4) as keyof object] ||
      phoneFormatSettings[phone.slice(1, 5) as keyof object] ||
      phoneFormatSettings;
    const mask = setting['format'] || phoneFormatSettings.defaultFormat;
    const pattern = setting['pattern'] || phoneFormatSettings.defaultPattern;

    const phoneNumber = phone.replace(pattern, mask);

    if (isMasked) {
      return maskPhoneNumber(phoneNumber);
    }

    return phoneNumber;
  };

  // console.log(formatterPhoneNumber('+79851234567', true));
  // console.log(formatterPhoneNumber('88005555777'));
  // console.log(formatterPhoneNumber('+84842575018'));

  console.log();

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
