import React, {FC} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import {AppRoute} from '../../common/constants';
import './app.css';

const App: FC = () => (
  <Router>
    <Routes>
      <Route path={AppRoute.Main} element={<Main />} />
      <Route path={AppRoute.NotFound} element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
