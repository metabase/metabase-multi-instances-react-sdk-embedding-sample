import { useState, useEffect, useMemo } from 'react';
import { InteractiveDashboard, MetabaseProvider } from "@metabase/embedding-sdk-react";

function IframeInstance() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const configParam = params.get('config');

    if (configParam) {
      const parsedConfig = JSON.parse(decodeURIComponent(configParam));
      setConfig(parsedConfig);
      window.parent.postMessage({ type: 'IFRAME_LOADED' }, '*');
    }
  }, []);

  const authConfig = useMemo(() => {
    if (!config) return null;

    return {
      metabaseInstanceUrl: config.metabaseInstanceUrl,
      fetchRequestToken: async () => {
        const url = `${config.authEndpoint}?dashboardId=${config.dashboardId}`;
        const response = await fetch(url);
        return await response.json();
      },
    };
  }, [config]);

  if (!config || !authConfig) return null;

  return (
    <MetabaseProvider authConfig={authConfig} theme={config.theme}>
      <InteractiveDashboard
        dashboardId={config.dashboardId}
        withTitle={config.withTitle}
        withDownloads={config.withDownloads}
      />
    </MetabaseProvider>
  );
}

export default IframeInstance;
