import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { TaskIconModalProvider } from './context/TaskIconModal/TaskIconModal';
import './index.css';


const store = configureStore();


ReactDOM.render(
    <React.StrictMode>
        <ModalProvider>
            <TaskIconModalProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </TaskIconModalProvider>
        </ModalProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
