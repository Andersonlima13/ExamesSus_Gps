import React from 'react';
import './NavBar.css';

export default function NavBar() {
  return (
    <header className="app-navbar">
      <div className="app-navbar-inner">
        <div className="brand">
          <div className="brand-icon">📄</div>
          <div>
            <div className="brand-title">ExameSUS</div>
            <div className="brand-sub">Sistema de Acompanhamento de Exames</div>
          </div>
        </div>
      </div>
    </header>
  );
}
