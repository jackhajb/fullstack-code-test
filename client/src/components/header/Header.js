import React, { useState } from 'react';

/******** Import Components *************/
import Hamburger from './Hamburger';

/******** Import Logo *************/
import logo from '../../logo.svg';

function Header() {
  /******** Instantiate State *************/
  const [burgerNavVisible, setBurgerNavVisible] = useState(false);

  /******** Helper Functions *************/
  const toggleBurgerNav = () => {
    setBurgerNavVisible(!burgerNavVisible);
  };

  /******** Render *************/
  return (
    <div className='header-main'>
      <div className='header-sub'>
        <img src={logo} alt='logo' className='header-logo' />
        <div className='header-space-block' />
        <a className='header-item'>About</a>
        <a className='header-item'>Contact</a>
        <a className='header-item'>Home</a>
        <Hamburger toggleBurgerNav={toggleBurgerNav} />
        {burgerNavVisible && (
          <nav className='header-burger-nav' >
            <a>About</a>
            <a>Contact</a>
            <a>Home</a>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Header;
