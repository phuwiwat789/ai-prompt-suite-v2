import Navbar from "../components/navbar.js";
import Sidebar from "../components/sidebar.js";

export default function MainLayout(content){

return `

<div class="min-h-screen bg-slate-950 text-white">

  ${Navbar()}

  <div class="md:flex md:items-start">

    ${Sidebar()}

    <main class="flex-1 p-4 md:p-6 lg:p-8 overflow-auto min-h-[calc(100vh-64px)]">
      ${content}
    </main>

  </div>

</div>

<script>
// Simple sidebar toggle for mobile
(function(){
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const isHidden = sidebar.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', (!isHidden).toString());
    });
  }

  // Delegate clicks on elements with data-path to client-side navigation
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-path]');
    if (!target) return;
    const path = target.getAttribute('data-path');
    if (!path) return;
    e.preventDefault();
    try {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (err) {
      console.warn('Navigation failed', err);
    }
  });

  // Keyboard accessibility for sidebar menu items (Enter/Space)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const active = document.activeElement;
    if (!active) return;
    if (active.hasAttribute('data-path')) {
      active.click();
      e.preventDefault();
    }
  });

})();
</script>

`;

}