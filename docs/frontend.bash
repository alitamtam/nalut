/frontend
│
├── /src
│   ├── /components                 # Reusable React components
│   │   └── Navbar.jsx
│   │   └── Footer.jsx
│   │   └── Sidebar.jsx
│   │   └── Card.jsx
│   │
│   ├── /pages                      # Pages for routing
│   │   └── Home.jsx
│   │   └── Login.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── /layouts                    # Common layout components (headers, footers)
│   │   └── MainLayout.jsx
│   │
│   ├── /styles
│   │   └── globals.css             # Global styles for Tailwind
│   │   └── tailwind.config.js       # Tailwind configuration
│   │
│   ├── /hooks                      # Custom React hooks
│   │   └── useAuth.js
│   │
│   ├── /utils                      # Utility functions and helpers
│   │   └── fetcher.js
│   │
│   ├── /context                    # React context for global states
│   │   └── AuthContext.js
│   │
│   ├── /assets                     # Images and static assets
│   │
│   └── main.jsx                    # Entry point for React
│
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.js                   # Vite configuration
└── package.json                     # Node.js dependencies for frontend


/.env                              # Environment variables for backend (DB credentials, etc.)
/frontend/.env                     # Environment variables for frontend (API URLs, etc.)
