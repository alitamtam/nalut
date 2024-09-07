/backend
│
├── /src
│   ├── /controllers
│   │   └── userController.js      # Controllers handle requests/responses logic
│   │
│   ├── /services
│   │   └── userService.js         # Business logic and service layer
│   │
│   ├── /routes
│   │   └── userRoutes.js          # Define API routes
│   │
│   ├── /middleware
│   │   └── authMiddleware.js      # Middleware for authentication/authorization
│   │
│   ├── /models
│   │   └── userModel.js           # Prisma models
│   │
│   ├── app.js                     # Express app configuration
│   ├── server.js                  # Server start-up
│   └── db.js                      # Database connection with Prisma
│
├── prisma/
│   ├── schema.prisma               # Define the database models for Prisma ORM
│   ├── migrations/                 # Auto-generated migration files
│   └── seed.js                     # Optional: Seed data for initial setup
│
└── package.json                    # Node.js dependencies for backend
