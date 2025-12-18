# Metabase Multi-Instance React SDK Embedding Sample

This sample application demonstrates how to embed **two Metabase instances simultaneously** on the same page using the Metabase Embedding SDK for React. Since the SDK uses global state and only supports one `MetabaseProvider` per application, this solution uses **iframes** to isolate each instance in its own context.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Main React App                                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  │
│  │ Iframe 1                │  │ Iframe 2                │  │
│  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │
│  │ │ MetabaseProvider 1  │ │  │ │ MetabaseProvider 2  │ │  │
│  │ │ InteractiveDashboard│ │  │ │ InteractiveDashboard│ │  │
│  │ └─────────────────────┘ │  │ └─────────────────────┘ │  │
│  └─────────────────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

Each iframe contains its own isolated instance of:
- React app
- MetabaseProvider
- InteractiveDashboard component

This isolation ensures that the global state of each Metabase SDK instance doesn't conflict with the other.

## Features

- 📊 **Dual Dashboard Display**: View dashboards from two different Metabase instances simultaneously
- 🔄 **Layout Toggle**: Switch between horizontal (side-by-side) and vertical (stacked) layouts
- 🎨 **Color-coded Instances**: Each instance has its own theme color for easy identification
- 📱 **Responsive Design**: Automatically adjusts layout for mobile devices
- 🔒 **Isolated Contexts**: Each iframe has its own MetabaseProvider, preventing state conflicts

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **Two Metabase instances** (version 52 or higher)
3. **API Keys** for each Metabase instance:
   - Go to Admin Settings → Embedding → Modular and enable "SDK for React"
   - Create API keys in Settings → Authentication → API keys

## Setup Instructions

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Configure Metabase Instances

Edit [`src/config.js`](src/config.js) and replace the placeholder values with your actual Metabase instance details:

```javascript
export const METABASE_INSTANCES = {
  instance1: {
    name: "Metabase Instance 1",
    metabaseInstanceUrl: "https://your-first-metabase-instance.com",
    apiKey: "YOUR_FIRST_API_KEY", // Get from Metabase Settings → Authentication → API keys
    dashboardId: 1, // Your dashboard ID
    color: "#509EE3",
  },
  instance2: {
    name: "Metabase Instance 2",
    metabaseInstanceUrl: "https://your-second-metabase-instance.com",
    apiKey: "YOUR_SECOND_API_KEY",
    dashboardId: 1,
    color: "#88BF4D",
  }
};
```

### 3. Run the Application

```bash
# Start development server
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
metabase-multi-instances-react-sdk-embedding-sample/
├── src/
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # Application styles
│   ├── MetabaseIframeInstance.jsx   # Iframe wrapper for each Metabase instance
│   ├── config.js                    # Configuration for both instances
│   └── main.jsx                     # React entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
└── README.md                        # This file
```

## How It Works

### 1. Main App ([`src/App.jsx`](src/App.jsx))
- Renders the layout container
- Provides layout toggle controls
- Manages the two `MetabaseIframeInstance` components

### 2. Iframe Instance Component ([`src/MetabaseIframeInstance.jsx`](src/MetabaseIframeInstance.jsx))
- Creates an isolated iframe for each Metabase instance
- Dynamically generates HTML content with embedded Metabase SDK
- Uses ESM imports from CDN (`esm.sh`) to load React and Metabase SDK inside iframe
- Handles loading states and error messages
- Communicates with parent window via `postMessage` API

### 3. Configuration ([`src/config.js`](src/config.js))
- Stores settings for both Metabase instances
- Easy to modify for your specific instances

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Keys for Development Only**: The API key authentication method shown in this sample is only suitable for:
   - Local development
   - Testing and evaluation
   - Demo purposes
   - **Never use API keys in production!**

2. **Production Requirements**: For production use, you should:
   - Implement JWT SSO authentication with a backend server
   - Have a Metabase Pro or Enterprise plan
   - Never expose API keys in client-side code
   - Use proper user authentication and authorization

3. **Iframe Sandbox**: The iframes use sandbox restrictions. Adjust the `sandbox` attribute in [`src/MetabaseIframeInstance.jsx`](src/MetabaseIframeInstance.jsx:204) based on your security requirements.

## Customization

### Change Dashboard IDs
Edit the `dashboardId` values in [`src/config.js`](src/config.js):
```javascript
dashboardId: 42, // Your dashboard ID
```

### Change Instance Names
Edit the `name` values in [`src/config.js`](src/config.js):
```javascript
name: "Sales Analytics",
```

### Change Theme Colors
Edit the `color` values in [`src/config.js`](src/config.js):
```javascript
color: "#FF6B6B", // Any valid CSS color
```

### Add More Instances
To add a third instance:

1. Add configuration in [`src/config.js`](src/config.js):
```javascript
instance3: {
  name: "Metabase Instance 3",
  metabaseInstanceUrl: "https://third-instance.com",
  apiKey: "THIRD_API_KEY",
  dashboardId: 1,
  color: "#FFA500"
}
```

2. Add the component in [`src/App.jsx`](src/App.jsx):
```jsx
<MetabaseIframeInstance config={METABASE_INSTANCES.instance3} />
```

## Troubleshooting

### Issue: "Loading..." never completes
**Solutions:**
- Verify your Metabase instance URL is correct and accessible
- Check that the API key is valid
- Ensure SDK is enabled in Metabase Admin Settings → Embedding → Modular
- Check browser console for CORS errors

### Issue: Dashboard not displaying
**Solutions:**
- Verify the dashboard ID exists in your Metabase instance
- Ensure the API key has permissions to access the dashboard
- Check that your Metabase version is 52 or higher

### Issue: CORS errors
**Solutions:**
- Metabase must be configured to allow your application's origin
- For local development, Metabase usually allows `localhost` by default
- Check Metabase security settings for allowed origins

### Issue: Blank iframes
**Solutions:**
- Open browser console and check for JavaScript errors
- Verify that esm.sh CDN is accessible
- Check iframe sandbox permissions

## Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## Resources

- [Metabase Embedding SDK Documentation](https://www.metabase.com/docs/latest/embedding/sdk/introduction)
- [Metabase SDK Quickstart](https://www.metabase.com/docs/latest/embedding/sdk/quickstart)
- [Metabase SDK API Reference](https://www.metabase.com/docs/latest/embedding/sdk/components)

## License

This is a sample application for demonstration purposes. Feel free to use and modify it for your needs.

## Support

For issues with:
- **This sample app**: Open an issue in this repository
- **Metabase SDK**: Check [Metabase documentation](https://www.metabase.com/docs/latest/embedding/sdk/introduction) or Metabase community forums
- **Metabase instance setup**: Consult [Metabase documentation](https://www.metabase.com/docs/latest/)
