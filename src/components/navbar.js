// src/components/navbar.js
export default function Navbar() {
  return `
    <header class="navbar bg-slate-900 border-b border-slate-800 p-3 md:p-4 flex items-center justify-between sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <button id="sidebarToggle" class="md:hidden p-2 rounded-lg bg-slate-800 text-slate-200" aria-label="Toggle navigation" aria-expanded="false">☰</button>
        <div class="logo text-sm font-bold text-indigo-300">🚀 AI Prompt Suite</div>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden sm:block text-xs text-slate-400">Signed in as <span id="user-email">Guest</span></div>
      </div>
    </header>
  `;
}