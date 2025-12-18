import './MetabaseIframeInstance.css';

export default function MetabaseIframeInstance({ config }) {
  return (
    <div className="metabase-instance" style={{ borderColor: config.color }}>
      <div className="metabase-instance-header" style={{ backgroundColor: config.color }}>
        {config.name}
      </div>
      <iframe
        src={`/src/iframe/iframe.html?config=${encodeURIComponent(JSON.stringify(config))}`}
        className="metabase-instance-iframe"
        title={config.name}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
