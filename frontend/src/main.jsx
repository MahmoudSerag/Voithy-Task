import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App.jsx';
import store from './app/store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import AdminRoute from './components/Admin.jsx';
import EditPatient from './components/EditPatient.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import DoctorProfilePage from './pages/DoctorProfilePage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='' element={<PrivateRoute />}>
        <Route index={true} path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/profile/d' element={<DoctorProfilePage />} />
        <Route path='/profile/d/:id/edit' element={<EditPatient />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
