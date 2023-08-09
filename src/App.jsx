import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import axiosInstance from '../src/request/index.jsx';
import { useAuthStatus } from './useAuthStatus';
import { Provider } from 'react-redux';
import Paint from './page/Paints/paint';
import Video from './page/Video/video';
import Login from './page/Login/login';
import Dashboard from './page/Dashboard/dashboard';
import Layout from './page/layout/layout';

import store from './store.jsx';

function AppRoutes() {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useAuthStatus();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  
  // redirect to login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path = ''  element = {<Layout />}></Route>
      <Route path = '/paint' element = {<Paint />}></Route>
      <Route path = '/video' element = {<Video />}></Route>
      <Route path = '/login' element = {<Login />}></Route>
      <Route path = '/dashboard' element = {<Dashboard />}></Route>
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>  
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;