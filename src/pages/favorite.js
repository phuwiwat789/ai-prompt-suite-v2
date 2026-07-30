// src/pages/favorite.js
export function FavoritePage() {
    return `
    <div class="max-w-6xl mx-auto p-4 sm:p-6">
        <div class="mb-4 border-b border-slate-800 pb-3">
            <div class="flex items-center justify-between gap-4">
                <div>
                    <span class="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Saved Items</span>
                    <h1 class="text-xl sm:text-2xl font-black text-white mt-1">⭐ รายการโปรด (Favorites)</h1>
                    <p class="text-xs text-slate-400 mt-0.5">คลัง Prompt ที่คุณบันทึกไว้ใช้งานบ่อย ดึงข้อมูลสดจาก Firebase Cloud</p>
                </div>
            </div>
        </div>

        <div id="favoriteCardsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="col-span-full text-center py-12 text-slate-500 text-xs">⏳ กำลังโหลดรายการโปรด...</div>
        </div>
    </div>
    `;
}
