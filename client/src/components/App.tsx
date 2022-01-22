import React from 'react';
import { Sidebar } from './Sidebar';

function App() {
  return (
    <div className='App'>
      <header className='App-header' data-testid='app-header'>
        <Sidebar />
      </header>

      <div>formss</div>
    </div>
  );
}

export default App;
