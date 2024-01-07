import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

function Header() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/films');
  };

  return (
    <header className='header'>
      <img src={logo} alt='logo' className='headerLogo' width="200" height="auto" onClick={navigateToHome} />
    </header>
  );
}

export default Header;