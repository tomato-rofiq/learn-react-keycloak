# React Keycloak Authentication

A React + TypeScript + Vite application with Keycloak authentication integration.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Quick Start

### 1. Start Keycloak Server
```bash
docker-compose up -d
```

Keycloak will be available at http://localhost:8080
- Admin username: `admin`
- Admin password: `admin`

### 2. Configure Keycloak (First Time Only)

1. Open http://localhost:8080 and login to Admin Console
2. Create a new realm: `myrealm`
3. Create a client:
   - Client ID: `react-app`
   - Valid redirect URIs: `http://localhost:5173/*`
   - Web origins: `http://localhost:5173`
4. Create a test user with credentials

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Project Structure
```
react-keycloak-app/
├── docker-compose.yml          # Keycloak + PostgreSQL setup
├── src/
│   ├── keycloak.ts            # Keycloak configuration
│   ├── main.tsx               # Keycloak initialization
│   ├── App.tsx                # Main app with auth UI
│   └── hooks/
│       └── useAuth.ts         # Custom auth hook (optional)
└── README.md
```

## Keycloak Configuration

The Keycloak instance is configured with:
- PostgreSQL database for data persistence
- Development mode (`start-dev`)
- Data persists across container restarts

### Useful Commands
```bash
# Stop Keycloak
docker-compose down

# Start Keycloak
docker-compose up -d

# View logs
docker-compose logs -f keycloak

# Fresh start (deletes all data)
docker-compose down -v
```

## Key Features

- ✅ User authentication via Keycloak
- ✅ Persistent configuration (PostgreSQL)
- ✅ Token auto-refresh
- ✅ TypeScript support
- ✅ React hooks for auth state

## Environment

- Keycloak URL: `http://localhost:8080/`
- Realm: `myrealm`
- Client ID: `react-app`
- React App: `http://localhost:5173`

## Troubleshooting

**Can't access Keycloak?**
- Check containers are running: `docker-compose ps`
- View logs: `docker-compose logs keycloak`

**Login redirects not working?**
- Verify redirect URIs in Keycloak client settings
- Ensure web origins includes `http://localhost:5173`

**Lost configuration?**
- Don't use `docker-compose down -v` (removes volumes)
- Use `docker-compose down` to preserve data