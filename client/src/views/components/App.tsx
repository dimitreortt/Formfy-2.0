import React from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <header className='App-header' data-testid='app-header'>
        <Navbar />
      </header>

      <div>formss</div>
    </div>
  );
}

export default App;
