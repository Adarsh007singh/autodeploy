import React from 'react';
import { createRoot } from 'react-dom/client';
import { Github, Server, Rocket, ShieldCheck } from 'lucide-react';
import './style.css';

function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="badge">React + GitHub Actions + AWS EC2</div>
        <h1>Auto Deploy Ready Project</h1>
        <p>
          Is project ko GitHub par push karte hi GitHub Actions automatically build karke
          aapke AWS EC2 server par deploy kar dega.
        </p>

        <div className="cards">
          <div className="card">
            <Github size={34} />
            <h3>GitHub Push</h3>
            <p>main branch par push hote hi workflow start hoga.</p>
          </div>

          <div className="card">
            <Rocket size={34} />
            <h3>Build</h3>
            <p>Vite production build generate karega.</p>
          </div>

          <div className="card">
            <Server size={34} />
            <h3>EC2 Deploy</h3>
            <p>dist folder Nginx root directory me copy hoga.</p>
          </div>

          <div className="card">
            <ShieldCheck size={34} />
            <h3>Nginx Serve</h3>
            <p>Aapka React app browser me live chalega.</p>
          </div>
        </div>

        <a className="button" href="https://github.com" target="_blank" rel="noreferrer">
          Push to GitHub
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
