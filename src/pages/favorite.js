// src/pages/favorite.js
export function FavoritePage() {
    return `
    <div class="max-w-6xl mx-auto p-4 sm:p-6">
        <div class="page-card p-6 mb-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div class="badge-cyber">Saved Items</div>
                    <h1 class="text-3xl font-black text-white mt-4">⭐ รายการโปรด (Favorites)</h1>
                    <p class="text-sm text-slate-400 mt-2">คลัง Prompt ที่คุณบันทึกไว้ใช้งานบ่อย ดึงข้อมูลสดจาก Firebase Cloud</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge-cyber">Live Sync</span>
                </div>
            </div>
        </div>
        <div id="favoriteCardsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="col-span-full text-center py-12 text-slate-500 text-xs">⏳ กำลังโหลดรายการโปรด...</div>
        </div>
    </div>
    `;
}
