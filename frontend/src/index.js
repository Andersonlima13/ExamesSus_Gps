import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
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
    <AppContainer>
      <Login />
    </AppContainer>
  </React.StrictMode>
);

