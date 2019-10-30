import React from 'react';

interface HamburgerProps {
  toggleBurgerNav(): void;
}

const Hamburger: React.FC<HamburgerProps> = ({ toggleBurgerNav }) => {
  return (
    <button className='header-burger' onClick={toggleBurgerNav} type='button'>
      <div className='header-burger-line' />
      <div className='header-burger-line' />
      <div className='header-burger-line' />
    </button>
  );
}

export default Hamburger;
