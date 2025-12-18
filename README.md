# Metabase Multi-Instance React SDK Embedding Sample

Demonstrates how to embed **two Metabase instances simultaneously** using the Metabase Embedding SDK for React. Since the SDK only supports one `MetabaseProvider` per application, this solution uses **iframes** to isolate each instance.

## Prerequisites

- Node.js 18+
- Two Metabase instances (v57+)
- JWT authentication configured

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```bash
# Metabase Instance 1
VITE_METABASE_URL_1=http://localhost:3000
METABASE_SECRET_KEY_1=your_secret_key_here
VITE_AUTH_ENDPOINT_1=http://localhost:3001/api/auth/metabase/instance1

# Metabase Instance 2
VITE_METABASE_URL_2=http://localhost:3001
METABASE_SECRET_KEY_2=your_secret_key_here
VITE_AUTH_ENDPOINT_2=http://localhost:3001/api/auth/metabase/instance2
```

4. Run the application:
```bash
npm run dev:all
```

This starts both the Vite dev server (port 3003) and JWT auth server (port 3001).

## How It Works

Each Metabase instance runs in an isolated iframe with its own `MetabaseProvider`. The JWT auth server signs tokens for each instance using the configured secret keys.

## Project Structure

```
src/
├── components/
│   └── MetabaseIframeInstance.jsx  # Iframe wrapper component
├── iframe/
│   ├── iframe.html                 # Iframe HTML template
│   ├── iframe-entry.jsx            # Iframe React entry point
│   └── iframe-instance.jsx         # MetabaseProvider + Dashboard
├── App.jsx                         # Main app
├── config.js                       # Instance configuration
server.js                           # JWT auth server
```

## Resources

- [Metabase Embedding SDK Documentation](https://www.metabase.com/docs/latest/embedding/sdk/introduction)
