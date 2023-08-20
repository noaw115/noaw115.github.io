import { Routes, Route } from 'react-router-dom';
// import Main from "./PC/Homepage/Main";
import Main from './PC/Homepage/index';
import MainDetailPage from './PC/DetailPages';
import MobileMain from './Mobile/Homepage/Main';
import MobileMainDetailPage from './Mobile/DetailPages';
import { useEffect, useState } from 'react';

function App() {
  let pageWidth = document.body.clientWidth;
  const [width, setWidth] = useState(document.body.clientWidth);
  window.addEventListener('resize', () => {
    //console.log("窗口变动",document.body.clientWidth)
    setWidth(document.body.clientWidth);
  });

  if (width > 820) {
    console.log('电脑版');
    return (
      <div>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/:page'} element={<MainDetailPage />} />
        </Routes>
      </div>
    );
  }
  else {
    console.log('手机版');
    return (
      <div>
        <Routes>
          <Route path={'/'} element={<MobileMain />} />
          <Route path={'/:page'} element={<MobileMainDetailPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
