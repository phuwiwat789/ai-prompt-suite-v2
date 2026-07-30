// src/pages/coding.js
import { codingLanguagesDB } from "../data/codingLanguages.js";

export default function CodingPage() {
    // Build options for codingLangSelect from codingLanguagesDB
    const options = Object.entries(codingLanguagesDB).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("\n");

    return `
    <div class="max-w-6xl mx-auto p-6">
        <div class="mb-6 border-b border-slate-800 pb-4">
            <h1 class="text-2xl font-black text-white mt-1">💻 Coding Assistant</h1>
            <p class="text-xs text-slate-400 mt-0.5">สร้าง prompt สำหรับเขียนโค้ดตามมาตรฐานความปลอดภัยระดับสูง</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div class="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">🧑‍💻 ภาษาโปรแกรม</label>
                    <select id="codingLangSelect" class="w-full p-2 border border-slate-700 rounded-xl bg-slate-950 text-xs text-white">
                        ${options}
                    </select>
                </div>

                <div id="codingLangDesc" class="text-sm text-slate-400 mt-2"></div>

                <div id="codingDynamicFields" class="space-y-3 mt-3"></div>

                <div class="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <input type="checkbox" id="includeTestsCheck" class="w-4 h-4 rounded bg-slate-950 accent-indigo-500 cursor-pointer">
                    <label for="includeTestsCheck" class="text-[10px] text-slate-400">รวม Unit Tests</label>
                </div>

                <div class="flex items-center gap-2">
                    <input type="checkbox" id="codingComplianceCheck" class="w-4 h-4 rounded bg-slate-950 accent-emerald-400 cursor-pointer">
                    <label for="codingComplianceCheck" class="text-[10px] text-emerald-400">เปิดโหมดรักษาความปลอดภัยข้อมูล (PDPA/GDPR)</label>
                </div>
            </div>

            <div class="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-inner">
                <div>
                    <div class="flex flex-wrap items-center gap-3 mb-3">
                        <button id="codingFavBtn" class="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 text-sm font-bold py-2 px-4 rounded-xl transition duration-200 flex items-center gap-2 shadow">⭐ เก็บเข้ารายการโปรด</button>
                        <button id="codingCopyBtn" class="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 text-sm font-bold text-white py-2 px-4 rounded-xl shadow-lg transition duration-200">📋 คัดลอกคำสั่ง</button>
                    </div>
                    <pre id="codingOutput" class="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-300 max-h-[60vh] md:h-[500px] overflow-y-auto bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 font-mono select-all"></pre>
                </div>
            </div>
        </div>
    </div>
    `;
}
