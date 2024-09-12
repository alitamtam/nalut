import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './Routes'; // Your new router setup
import { store } from './store/store'; // Import your store
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}> {/* Wrap with Provider */}
            <RouterProvider router={AppRouter} />
        </Provider>
    </React.StrictMode>
);
