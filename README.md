# Calendar App

App made for an interview task

# Deploy with docker

```bash
# Copy and check environment variables at .env
cp example.env .env
# Start up docker containers
docker compose up
```

# Run locally

```bash
# Install node modules
yarn
# Build schemas
yarn build:schema
# Startup backend dev
yarn backend dev
# Startup frontend dev
yarn frontend start --configuration=development
```
