// src/prompt/libraryBuilder.js
import { templatesDB } from "../data/templatesDB.js";
import { SkeletonCard } from "../components/ui.js";

export function initLibraryBuilder() {
    const searchInput = document.getElementById("librarySearchInput");
    const categorySelect = document.getElementById("libraryCategorySelect");
    const cardsGrid = document.getElementById("libraryCardsGrid");

    if (!cardsGrid) return;

    function renderSkeletons(count = 6) {
        cardsGrid.innerHTML = Array.from({length: count}).map(() => SkeletonCard()).join('\n');
    }

    function renderTemplates() {
        // show quick skeleton while computing (very fast but improves perceived performance)
        renderSkeletons(6);

        const query = (searchInput?.value || "").toLowerCase();
        const selectedCat = categorySelect?.value || "ALL";

        const filtered = templatesDB.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(query) || 
                                  item.prompt.toLowerCase().includes(query) ||
                                  item.tags.some(t => t.toLowerCase().includes(query));
            const matchesCategory = selectedCat === "ALL" || item.category === selectedCat;
            return matchesSearch && matchesCategory;
        });

        if (filtered.length === 0) {
            cardsGrid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 text-xs">ไม่พบแม่แบบที่ตรงกับคำค้นหา</div>`;
            return;
        }

        cardsGrid.innerHTML = filtered.map(item => `
            <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <span class="bg-slate-800 text-indigo-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">${item.category}</span>
                    </div>
                    <h3 class="text-sm font-bold text-white mb-2">${item.title}</h3>
                    <p class="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-900 font-mono mb-3 line-clamp-3">${item.prompt}</p>
                </div>
                <div class="flex justify-between items-center pt-2 border-t border-slate-800/60">
                    <div class="flex gap-1">${item.tags.map(t => `<span class="text-[9px] text-slate-500">#${t}</span>`).join(' ')}</div>
                    <button data-copy="${encodeURIComponent(item.prompt)}" class="lib-copy-btn bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-1.5 px-3 rounded-xl transition">📋 คัดลอก</button>
                </div>
            </div>
        `).join('');

        // Event listener สำหรับปุ่มคัดลอก
        document.querySelectorAll(".lib-copy-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const text = decodeURIComponent(e.currentTarget.dataset.copy);
                navigator.clipboard.writeText(text).then(() => {
                    e.currentTarget.innerText = "✅ คัดลอกแล้ว";
                    setTimeout(() => { e.currentTarget.innerText = "📋 คัดลอก"; }, 2000);
                });
            });
        });
    }

    searchInput?.addEventListener("input", renderTemplates);
    categorySelect?.addEventListener("change", renderTemplates);
    renderTemplates();
}
