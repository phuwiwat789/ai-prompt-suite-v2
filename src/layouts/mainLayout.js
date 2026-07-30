// src/layouts/mainLayout.js
import Navbar from "../components/navbar.js";

export default function MainLayout(content) {
  return `
    <div class="app-shell">
      ${Navbar()}
      <main class="flex-1 p-4 md:p-6 lg:p-8 overflow-auto min-h-[calc(100vh-64px)]">
        ${content}
      </main>
    </div>

    <script>
    (function(){
      function updateActiveNav() {
        const path = window.location.pathname || '/';
        document.querySelectorAll('[data-path]').forEach(el => {
          const isActive = el.getAttribute('data-path') === path;
          el.classList.toggle('active', isActive);
          if (isActive && el.scrollIntoView) {
            el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
          }
        });
      }

      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-path]');
        if (!target) return;
        const path = target.getAttribute('data-path');
        if (!path) return;
        e.preventDefault();
        try {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          updateActiveNav();
        } catch (err) {
          console.warn('Navigation failed', err);
        }
      });

      window.addEventListener('popstate', updateActiveNav);
      updateActiveNav();
    })();
    </script>
  `;
}