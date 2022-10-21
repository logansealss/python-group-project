import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { AllDropDownsProvider } from './context/Dropdown';
import './index.css';


const store = configureStore();


ReactDOM.render(
    <React.StrictMode>
        <AllDropDownsProvider>
            <ModalProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
            </ModalProvider>
        </AllDropDownsProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
