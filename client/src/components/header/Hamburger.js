import React from 'react';

function Hamburger({ toggleBurgerNav }) {
  return (
    <button className='header-burger' onClick={toggleBurgerNav} type='button'>
      <div className='header-burger-line' />
      <div className='header-burger-line' />
      <div className='header-burger-line' />
    </button>
  );
}

export default Hamburger;
