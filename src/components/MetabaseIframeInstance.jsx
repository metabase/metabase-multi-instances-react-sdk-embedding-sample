import { useEffect, useState } from 'react';

export default function MetabaseIframeInstance({ config }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'IFRAME_LOADED') {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      border: `3px solid ${config.color}`,
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      position: 'relative'
    }}>
      <div style={{
        padding: '12px 16px',
        backgroundColor: config.color,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
      }}>
        {config.name}
      </div>

      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          Loading...
        </div>
      )}

      <iframe
        src={`/src/iframe/iframe.html?config=${encodeURIComponent(JSON.stringify(config))}`}
        style={{ flex: 1, border: 'none', width: '100%', height: '100%' }}
        title={config.name}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
