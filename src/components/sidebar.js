// src/components/sidebar.js
export default function Sidebar() {
    return `
    <aside id="sidebar" class="hidden md:block w-full md:w-72 bg-slate-900 border-r border-slate-800 h-[calc(100vh-64px)] md:sticky md:top-16 p-4">
        <div class="mb-4 flex items-center justify-between">
            <div class="text-sm font-extrabold text-indigo-300">Navigation</div>
        </div>
        <ul id="sidebar-menu" class="space-y-1" role="menu" aria-label="Main navigation">
            <li data-path="/dashboard" tabindex="0" role="menuitem" aria-label="Dashboard" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">🏠 Dashboard</li>
            <li data-path="/prompt" tabindex="0" role="menuitem" aria-label="Prompt Builder" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">🤖 Prompt Builder</li>
            <li data-path="/creator" tabindex="0" role="menuitem" aria-label="Creator Studio" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">🎨 Creator Studio</li>
            <li data-path="/coding" tabindex="0" role="menuitem" aria-label="Coding Assistant" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">💻 Coding Assistant</li>
            <li data-path="/library" tabindex="0" role="menuitem" aria-label="Library" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">📚 Library</li>
            <li data-path="/favorite" tabindex="0" role="menuitem" aria-label="Favorites" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">⭐ Favorite</li>
            <li data-path="/history" tabindex="0" role="menuitem" aria-label="History" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">📜 History</li>
            <li data-path="/settings" tabindex="0" role="menuitem" aria-label="Settings" class="px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer text-sm">⚙ Settings</li>
        </ul>
    </aside>
    `;
}