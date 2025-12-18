/**
 * Configuration for two Metabase instances
 * Uses JWT authentication via backend server
 * Environment variables are loaded from .env file
 */

export const METABASE_INSTANCES = {
  instance1: {
    name: "Metabase Instance 1",
    metabaseInstanceUrl: import.meta.env.VITE_METABASE_URL_1,
    authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT_1,
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
    metabaseInstanceUrl: import.meta.env.VITE_METABASE_URL_2,
    authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT_2,
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
