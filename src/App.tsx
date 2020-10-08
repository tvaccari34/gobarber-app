import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './routes';
import SignIn from './pages/SignIn';
//import SignUp from './pages/SignUp';

import ToastContainer from './components/ToastContainer';

import AppProvider from './hooks/index';
import { Route } from 'react-router-dom';

const App: React.FC = () => (
    <BrowserRouter>
        <AppProvider>
                <Routes />
        </AppProvider>
        <GlobalStyle />
    </BrowserRouter>
);

export default App;
