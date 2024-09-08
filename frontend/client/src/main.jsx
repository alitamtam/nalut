import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router'; // Import the router
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRouter /> {/* RouterProvider should be here, not in App */}

    </React.StrictMode>
);
