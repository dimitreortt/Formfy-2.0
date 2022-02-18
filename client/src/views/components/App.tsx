import React from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';

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
