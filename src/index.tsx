import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'app/providers/themeProvider/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from 'app/providers/storeProvider/store';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,

);
