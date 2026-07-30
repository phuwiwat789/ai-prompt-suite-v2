// src/components/sidebar.js
export default function Sidebar() {
    return `
    <aside id="sidebar" class="hidden md:block w-full md:w-72 bg-[#070a12] border-r border-r-[#14314d] h-[calc(100vh-64px)] md:sticky md:top-16 p-4">
        <div class="mb-6">
            <div class="badge-cyber">NAV</div>
            <div class="mt-4 text-sm font-extrabold text-[#7dd3fc]">Cyber Grid</div>
        </div>
        <ul id="sidebar-menu" class="space-y-2" role="menu" aria-label="Main navigation">
            <li data-path="/dashboard" tabindex="0" role="menuitem" class="sidebar-item">🏠 Dashboard</li>
            <li data-path="/prompt" tabindex="0" role="menuitem" class="sidebar-item">🤖 Prompt Builder</li>
            <li data-path="/creator" tabindex="0" role="menuitem" class="sidebar-item">🎨 Creator Studio</li>
            <li data-path="/coding" tabindex="0" role="menuitem" class="sidebar-item">💻 Coding Assistant</li>
            <li data-path="/library" tabindex="0" role="menuitem" class="sidebar-item">📚 Library</li>
            <li data-path="/favorite" tabindex="0" role="menuitem" class="sidebar-item">⭐ Favorite</li>
            <li data-path="/history" tabindex="0" role="menuitem" class="sidebar-item">📜 History</li>
            <li data-path="/settings" tabindex="0" role="menuitem" class="sidebar-item">⚙️ Settings</li>
        </ul>
    </aside>
    `;
}