import MetabaseIframeInstance from './components/MetabaseIframeInstance';
import { METABASE_INSTANCES } from './config';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Metabase Multi-Instance Embedding Sample</h1>
        <p className="subtitle">
          Two Metabase instances running simultaneously in isolated iframes
        </p>
      </header>

      <div className="instances-container">
        <MetabaseIframeInstance config={METABASE_INSTANCES.instance1} />
        <MetabaseIframeInstance config={METABASE_INSTANCES.instance2} />
      </div>
    </div>
  );
}

export default App;
