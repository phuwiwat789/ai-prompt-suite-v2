// src/pages/languages.js
export function LanguagesPage() {
    return `
    <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6 border-b border-slate-800 pb-4">
            <h1 class="text-2xl font-black text-white mt-1">🧩 จัดการภาษาโปรแกรม (Developer Languages)</h1>
            <p class="text-xs text-slate-400 mt-0.5">แก้ไขและทดสอบแม่แบบฟิลด์สำหรับแต่ละภาษา</p>
        </div>

        <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
            <div id="languageManager"></div>
        </div>
    </div>
    `;
}
