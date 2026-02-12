
 # Environment Configuration

This project supports multiple environments with different configurations. Each environment has its own `.env` file with specific settings. The active file is selected via the `ENV_FILE` variable in webpack (`ENV_FILE` → path passed to `dotenv-webpack`).

## Available Environments

### 1. Development (`.env.development`)
- **Purpose**: Local development environment
- **API URL**: `http://localhost:8000/api`
- **Features**: Debug enabled, mock data available, dev tools enabled
- **Usage**: `npm run dev` or `npm start`

### 2. Staging (`.env.staging`)
- **Purpose**: Staging environment for testing
- **API URL**: `https://api-staging.homestay.com/api`
- **Features**: Debug enabled, no mock data, dev tools enabled
- **Usage**: `npm run staging`

### 3. UAT (`.env.uat`)
- **Purpose**: User Acceptance Testing environment
- **API URL**: `https://api-uat.homestay.com/api`
- **Features**: Debug disabled, production-like settings
- **Usage**: `npm run uat`

### 4. Production (`.env.production`)
- **Purpose**: Production environment
- **API URL**: `https://api.homestay.com/api`
- **Features**: All debug features disabled, optimized for performance
- **Usage**: `npm run prod`

## Setup Instructions

1. **Copy the example file**: Use `.env.example` as a template
   ```bash
   cp .env.example .env.development
   ```

2. **Update values**: Edit the copied file with your specific configuration
   - For development: edit `.env.development`
   - For staging: edit `.env.staging`
   - For UAT: edit `.env.uat`
   - For production: edit `.env.production`

3. **Run the application**: Use the appropriate npm script for your environment. Optionally set `ENV_FILE` to force a specific env file:

   ```bash
   # Development
   ENV_FILE=.env.development npm start

   # Staging
   ENV_FILE=.env.staging npm run staging

   # UAT
   ENV_FILE=.env.uat npm run uat

   # Production build
   ENV_FILE=.env.production npm run build
   ```

## Available Scripts

```bash
# Development
npm run start       # Start development server
npm run dev         # Same as start
npm run build:dev   # Build for development

# Staging
npm run staging     # Start staging server
npm run build:staging # Build for staging

# UAT
npm run uat         # Start UAT server
npm run build:uat   # Build for UAT

# Production
npm run prod        # Start production server
npm run build       # Build for production
npm run build:prod  # Same as build
```

## Environment Variables

This app uses `dotenv-webpack` (see `webpack.config.js`) to inject variables from the selected env file into the frontend at build time. There is no required prefix.

### Social Authentication
- `GOOGLE_AUTH_URL`: Redirect URL for Google login (used by `AuthModal`)
- `FACEBOOK_AUTH_URL`: Redirect URL for Facebook login (used by `AuthModal`)

### API
- `API_BASE_URL`: Base URL for API calls (example: `http://localhost:8000/api`)
- `API_TIMEOUT_MS`: Request timeout in milliseconds (optional)

## Security Notes

- Environment files containing sensitive data are excluded from version control
- Never commit actual environment files to the repository
- Use `.env.example` to document required variables
- Rotate API keys and secrets regularly

## Troubleshooting

1. **Environment not loading**: Ensure the file name matches exactly (e.g., `.env.development`)
2. **Variables not accessible**: Ensure the variable exists in the selected `.env` file and you rebuilt/restarted the dev server
3. **Wrong environment**: Verify you're using the correct npm script for your intended environment

