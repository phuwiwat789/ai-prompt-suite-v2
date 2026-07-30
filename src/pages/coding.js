// src/pages/coding.js
import { codingLanguagesDB } from "../data/codingLanguages.js";

export default function CodingPage() {
    const options = Object.entries(codingLanguagesDB)
        .map(([k, v]) => `<option value="${k}">${v.name}</option>`)
        .join("\n");

    return `
    <div class="max-w-6xl mx-auto p-4 sm:p-6">
        <div class="page-card p-6 mb-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div class="badge-cyber">Coding Studio</div>
                    <h1 class="text-3xl font-black text-white mt-4">💻 Coding Assistant</h1>
                    <p class="text-sm text-slate-400 mt-2">สร้าง prompt สำหรับเขียนโค้ดตามมาตรฐานความปลอดภัยระดับสูง</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge-cyber">Dev Flow</span>
                    <span class="badge-cyber">SaaS Ready</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
            <div class="page-panel p-6 space-y-5">
                <div class="section-panel space-y-4">
                    <div class="section-tag">[LANGUAGE]</div>
                    <label class="block text-sm font-semibold text-slate-300">ภาษาโปรแกรม</label>
                    <select id="codingLangSelect" class="w-full p-3 border border-slate-700 rounded-3xl bg-[#081627] text-sm text-white">
                        ${options}
                    </select>
                    <div id="codingLangDesc" class="text-sm text-slate-400"></div>
                </div>

                <div id="codingDynamicFields" class="space-y-3"></div>

                <div class="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-slate-800">
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="includeTestsCheck" class="w-5 h-5 rounded-full bg-[#11203e] accent-[#5eead4] cursor-pointer">
                        <label for="includeTestsCheck" class="text-sm text-slate-300">รวม Unit Tests</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="codingComplianceCheck" class="w-5 h-5 rounded-full bg-[#11203e] accent-[#5eead4] cursor-pointer" checked>
                        <label for="codingComplianceCheck" class="text-sm text-[#7dd3fc]">เปิดโหมดรักษาความปลอดภัยข้อมูล (PDPA/GDPR)</label>
                    </div>
                </div>
            </div>

            <div class="terminal-box flex flex-col overflow-hidden">
                <div class="terminal-header">
                    <span class="terminal-label">CODE PROMPT</span>
                    <span class="badge-cyber">AI Ready</span>
                </div>
                <div class="terminal-body" id="codingOutput"></div>
                <div class="flex flex-wrap gap-3 p-5 border-t border-slate-800/40 bg-[#091827]">
                    <button id="codingFavBtn" class="pill-btn pill-btn-secondary">⭐ เก็บเข้ารายการโปรด</button>
                    <button id="codingCopyBtn" class="pill-btn pill-btn-primary">📋 คัดลอกคำสั่ง</button>
                </div>
            </div>
        </div>
    </div>
    `;
}