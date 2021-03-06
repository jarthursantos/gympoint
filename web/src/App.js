import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PersistGate } from 'redux-persist/integration/react';

import './config/reactotron';

import DeleteDialog from './components/DeleteDialog';
import Routes from './routes';
import history from './services/history';
import { store, persistor } from './store';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />

          <GlobalStyle />
          <ToastContainer
            toastClassName="toast-container"
            bodyClassName="toast-container"
            newestOnTop
            position="top-center"
            autoClose={3000}
          />
          <DeleteDialog />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
