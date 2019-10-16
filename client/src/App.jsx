import React from 'react';

/******** Import Styling *************/
import './_scss/main.scss';

/******** Import Components *************/
import Header from './components/header/Header';
import Map from './components/Map'

const App = () => {
  return (
    <div className='app-container'>
      <Header />
      <Map />
    </div>
  );
};

export default App;
