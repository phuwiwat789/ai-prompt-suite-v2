// src/pages/library.js
export function LibraryPage() {
    return `
    <div class="max-w-6xl mx-auto p-6">
        <div class="mb-6 border-b border-slate-800 pb-4">
            <span class="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Curated Collection</span>
            <h1 class="text-2xl font-black text-white mt-1">📚 Prompt Library</h1>
            <p class="text-xs text-slate-400 mt-0.5">คลังคำสั่งแม่แบบสำเร็จรูปที่ผ่านการทดสอบคุณภาพ พร้อมใช้งานทันที</p>
        </div>

        <!-- Search & Filter Bar -->
        <div class="mb-6 flex flex-col md:flex-row gap-4">
            <input type="text" id="librarySearchInput" placeholder="🔍 ค้นหาแม่แบบ เช่น สรุปบทความ, Cold Email, Refactor..." class="flex-1 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500" />
            <select id="libraryCategorySelect" class="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-indigo-300">
                <option value="ALL">ทุกหมวดหมู่ (All Categories)</option>
                <option value="Business">💼 Business</option>
                <option value="Marketing">📢 Marketing</option>
                <option value="Coding">💻 Coding</option>
                <option value="Creator">🎨 Creator</option>
            </select>
        </div>

        <!-- Cards Grid Container -->
        <div id="libraryCardsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
    `;
}
