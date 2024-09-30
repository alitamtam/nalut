import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './Routes'; // Your new router setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import the i18n configuration

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}> {/* Wrap with I18nextProvider */}
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={AppRouter} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </I18nextProvider>
    </React.StrictMode>
);
