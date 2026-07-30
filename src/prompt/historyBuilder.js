// src/prompt/historyBuilder.js
// Minimal history builder to satisfy router import and provide basic history rendering.
import { getHistoryList } from "../services/firestore.js";
import { Spinner, SkeletonCard } from "../components/ui.js";

export async function initHistoryBuilder() {
    const grid = document.getElementById('historyCardsGrid');
    if (!grid) return;

    // show skeletons + spinner
    grid.innerHTML = Array.from({length: 4}).map(() => SkeletonCard()).join('\n');
    const loadingEl = document.createElement('div');
    loadingEl.className = 'col-span-full text-center py-6 text-slate-400 text-xs';
    loadingEl.innerHTML = Spinner(20, 'กำลังโหลดประวัติ...');
    grid.parentNode.insertBefore(loadingEl, grid);

    try {
        const list = await getHistoryList();
        loadingEl.remove();
        if (!list || list.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 text-xs">ยังไม่มีประวัติการสร้าง</div>`;
            return;
        }

        grid.innerHTML = list.map(item => `
            <div class="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="text-sm font-bold text-white">${item.persona || item.language || 'Prompt'}</h3>
                        <p class="text-xs text-slate-400">${item.model || item.modelId || ''} • ${new Date(item.createdAt?.seconds ? item.createdAt.seconds*1000 : Date.now()).toLocaleString()}</p>
                    </div>
                </div>
                <pre class="text-sm text-slate-300 font-mono p-3 bg-slate-950 rounded">${(item.content || '').replace(/</g,'&lt;')}</pre>
            </div>
        `).join('\n');

    } catch (err) {
        console.error('Failed to load history:', err);
        loadingEl.remove();
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-rose-400 text-xs">เกิดข้อผิดพลาดในการโหลดประวัติ: ${err.message || 'Unknown'}</div>`;
    }
}
