import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoute } from './common/enums';
import { ProtectedRoute } from './components/common/protected-route';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* <Route path={AppRoute.SIGN_IN} element={<SignIn />} /> */}
        {/* <Route path={AppRoute.SIGN_UP} element={<SignUp />} /> */}
        {/* <Route path={AppRoute.CONFIRM_EMAIL} element={<ConfirmEmail />} /> */}
        {/* <ProtectedRoute path={AppRoute.TASKS} element={<Tasks />} /> */}
        <ProtectedRoute
          path="/"
          element={<Navigate replace to={AppRoute.TASKS} />}
        />
        <Route path="*" element={<Navigate replace to={AppRoute.TASKS} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
