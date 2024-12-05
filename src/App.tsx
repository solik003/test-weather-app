import React from 'react';
import { Provider } from 'react-redux';
import store  from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {HomePage} from './pages/HomePage/HomePage';
import {DetailedPage} from './pages/DetailedPage/DetailedPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:cityName" element={<DetailedPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

