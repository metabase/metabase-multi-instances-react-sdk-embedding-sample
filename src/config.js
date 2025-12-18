/**
 * Configuration for two Metabase instances
 * Replace these values with your actual Metabase instance URLs, API keys, and dashboard IDs
 */

export const METABASE_INSTANCES = {
  instance1: {
    name: "Metabase Instance 1",
    metabaseInstanceUrl: "YOUR_METABASE_URL", // e.g., "http://localhost:3000"
    apiKey: "YOUR_API_KEY", // Get from Metabase: Settings → Authentication → API keys
    dashboardId: 1,
    color: "#509EE3",
    withTitle: true,
    withDownloads: true,
    theme: {
      colors: {
        brand: "#509EE3",
      },
    },
  },

  instance2: {
    name: "Metabase Instance 2",
    metabaseInstanceUrl: "YOUR_METABASE_URL", // e.g., "http://localhost:3000"
    apiKey: "YOUR_API_KEY", // Get from Metabase: Settings → Authentication → API keys
    dashboardId: 1,
    color: "#88BF4D",
    withTitle: true,
    withDownloads: true,
    theme: {
      colors: {
        brand: "#88BF4D",
      },
    },
  }
};
