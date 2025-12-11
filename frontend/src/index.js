import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Exame from './pages/Exame';
import ExameCidadao from './pages/ExameCidadao';
import Footer from './components/Footer';

const AppContainer = ({children}) => (
  <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
    <div style={{flex:1}}>{children}</div>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/home/agendamento" element={<Exame />} />
          <Route path="/home/exame" element={<ExameCidadao />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  </React.StrictMode>
);

