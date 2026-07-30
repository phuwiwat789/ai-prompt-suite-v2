// src/components/navbar.js
export default function Navbar() {
  return `
    <header class="navbar page-header navbar-horizontal">
      <div class="navbar-brand">
        <div class="logo">🚀 AI Prompt Suite Infinite</div>
        <div class="nav-subtitle">Cyber Pill Navigation</div>
      </div>
      <nav id="topNav" class="nav-pill-bar" role="navigation" aria-label="Primary navigation">
        <button data-path="/dashboard" class="nav-pill" type="button">🏠 Dashboard</button>
        <button data-path="/prompt" class="nav-pill" type="button">🤖 Prompt Builder</button>
        <button data-path="/creator" class="nav-pill" type="button">🎨 Creator Studio</button>
        <button data-path="/coding" class="nav-pill" type="button">💻 Coding Assistant</button>
        <button data-path="/library" class="nav-pill" type="button">📚 Library</button>
        <button data-path="/favorite" class="nav-pill" type="button">⭐ Favorites</button>
        <button data-path="/history" class="nav-pill" type="button">📜 History</button>
        <button data-path="/settings" class="nav-pill" type="button">⚙️ Settings</button>
      </nav>
      <div class="nav-right">
        <div class="user-badge">Guest</div>
      </div>
    </header>
  `;
}