// src/pages/library.js
export function LibraryPage() {
    return `
    <div class="max-w-6xl mx-auto p-4 sm:p-6">
        <div class="page-card p-6 mb-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div class="badge-cyber">Curated Collection</div>
                    <h1 class="text-3xl font-black text-white mt-4">📚 Prompt Library</h1>
                    <p class="text-sm text-slate-400 mt-2">คลังคำสั่งแม่แบบสำเร็จรูปที่ผ่านการทดสอบคุณภาพ พร้อมใช้งานทันที</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge-cyber">Template Hub</span>
                    <span class="badge-cyber">Instant Copy</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6">
            <div class="page-panel p-5">
                <div class="grid grid-cols-1 lg:grid-cols-[1fr_0.45fr] gap-4">
                    <input type="text" id="librarySearchInput" placeholder="🔍 ค้นหาแม่แบบ เช่น สรุปบทความ, Cold Email, Refactor..." class="w-full p-3 bg-[#081627] border border-slate-700 rounded-3xl text-sm text-white focus:outline-none focus:border-indigo-500" />
                    <select id="libraryCategorySelect" class="w-full p-3 bg-[#081627] border border-slate-700 rounded-3xl text-sm font-semibold text-indigo-300">
                        <option value="ALL">ทุกหมวดหมู่ (All Categories)</option>
                        <option value="Business">💼 Business</option>
                        <option value="Marketing">📢 Marketing</option>
                        <option value="Coding">💻 Coding</option>
                        <option value="Creator">🎨 Creator</option>
                    </select>
                </div>
            </div>
            <div id="libraryCardsGrid" class="card-grid"></div>
        </div>
    </div>
    `;
}
