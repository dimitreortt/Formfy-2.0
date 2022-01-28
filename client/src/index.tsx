import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/components/App';
import reportWebVitals from './reportWebVitals';
import { store } from './application/store/configureStore';
import { Provider } from 'react-redux';
import { ApplicationContext } from './application/contexts/ApplicationContext';
import { FetchAdapter } from './infra/http/FetchAdapter';
import { theme } from './views/materialUI/theme';
import { ThemeProvider } from '@mui/system';
import { AppRouter } from './routers/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApplicationContext.Provider value={{ httpClient: new FetchAdapter() }}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </ApplicationContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
