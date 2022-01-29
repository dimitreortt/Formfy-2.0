import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from '../views/components/App';
import { FormManagePage } from '../views/pages/FormManage/FormManagePage';
import { FillFormPage } from '../views/pages/FillForm/FillFormPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='formManage/:formId' element={<FormManagePage />} />
        <Route path='fillForm/:formId' element={<FillFormPage />} />
        <Route path='/' element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
