// src/pages/prompt.js
import { personasDB } from "../data/personas.js";
import { aiModelsDB } from "../data/models.js";
import { generatePrompt } from "../prompt/generator.js";

export default function PromptPage() {
    return `
    <div class="max-w-6xl mx-auto p-6">
        <!-- ส่วนหัว -->
        <div class="mb-6 border-b border-slate-800 pb-4">
            <span class="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Enterprise Builder</span>
            <h1 class="text-2xl font-black text-white mt-1">🛠️ แผงควบคุมวิศวกรรมคำสั่ง (AI Prompt Builder)</h1>
            <p class="text-xs text-slate-400 mt-0.5">ออกแบบคำสั่งระดับมืออาชีพสำหรับทุกสายงาน</p>
        </div>

        <!-- แผงทำงาน 2 ฝั่ง (ซ้าย: เลือกพารามิเตอร์ / ขวา: แสดงผล Prompt) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- ฝั่งซ้าย: ฟอร์มตั้งค่า -->
            <div class="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">🎬 1. ประเภทผลลัพธ์</label>
                    <select id="mediaTypeInput" class="w-full p-2 border border-slate-700 rounded-xl bg-slate-950 text-xs font-semibold text-white">
                        <option value="text">📝 งานเขียน / คอนเทนต์ / แผนธุรกิจ</option>
                        <option value="code">💻 เขียนโปรแกรม / สถาปัตยกรรมระบบ</option>
                        <option value="data">📊 วิเคราะห์ข้อมูล / สถิติ / ธุรกิจ</option>
                        <option value="image">🎨 ภาพนิ่ง / คอนเซปต์อาร์ต / กราฟิก</option>
                    </select>
                </div>

                <div id="personaSection">
                    <label class="block text-[10px] font-bold text-indigo-400 uppercase mb-1">🌟 2. สวมบทบาท (Expert Persona)</label>
                    <select id="personaSelect" class="w-full p-2 border border-indigo-900/60 rounded-xl bg-slate-950 text-xs text-white"></select>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">🤖 3. ค่าย AI เป้าหมาย</label>
                    <select id="aiModelSelect" class="w-full p-2 border border-slate-700 rounded-xl bg-slate-950 text-xs text-white"></select>
                </div>

                <div id="languageSection" style="display:none;">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">🧑‍💻 3b. ภาษาโปรแกรม (Dev Language)</label>
                    <select id="codingLanguageSelect" class="w-full p-2 border border-slate-700 rounded-xl bg-slate-950 text-xs text-white"></select>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">🎯 4. ภารกิจ (Task / Brief)</label>
                    <textarea id="taskInput" rows="3" placeholder="ระบุรายละเอียดงานที่ต้องการให้ AI ทำ..." class="w-full p-2 border border-slate-700 rounded-xl text-xs bg-slate-950 text-white">เขียนกลยุทธ์การขายคอนโดมิเนียมหรูใจกลางเมืองให้จบใน 3 เดือน</textarea>
                </div>

                <div id="audienceSection">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">👥 5. กลุ่มเป้าหมาย</label>
                    <input type="text" id="audienceInput" value="นักลงทุนอสังหาฯ และผู้บริหารระดับสูง (C-Level)" class="w-full p-2 border border-slate-700 rounded-xl text-xs bg-slate-950 text-white" />
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">✨ 6. รูปแบบ/สไตล์ (Tone of Voice)</label>
                    <input type="text" id="styleInput" value="เป็นทางการ น่าเชื่อถือ อ้างอิงข้อมูลสถิติ และนำเสนอเป็น Bullet points" class="w-full p-2 border border-slate-700 rounded-xl text-xs bg-slate-950 text-white" />
                </div>

                <div id="ratioSection" class="hidden">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">📐 7. อัตราส่วนภาพ (Aspect Ratio)</label>
                    <select id="ratioInput" class="w-full p-2 border border-slate-700 rounded-xl bg-slate-950 text-xs text-white">
                        <option value="16:9">📺 16:9 (แนวนอน / YouTube)</option>
                        <option value="9:16">📱 9:16 (แนวตั้ง / Reels / TikTok)</option>
                        <option value="1:1">🔲 1:1 (สี่เหลี่ยมจัตุรัส)</option>
                    </select>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 pt-2 border-t border-slate-800">
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="includeTestsCheck" class="w-5 h-5 rounded bg-slate-950 accent-indigo-500 cursor-pointer">
                        <label for="includeTestsCheck" class="text-sm text-slate-400">รวม Unit Tests</label>
                    </div>

                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="complianceCheck" class="w-5 h-5 rounded bg-slate-950 accent-indigo-500 cursor-pointer">
                        <label for="complianceCheck" class="text-sm text-emerald-400 font-bold cursor-pointer uppercase tracking-wider">🛡️ เปิดโหมดรักษาความปลอดภัยข้อมูล (PDPA/GDPR)</label>
                    </div>
                </div>
            </div>

            <!-- ฝั่งขวา: หน้าจอ Terminal แสดงผลลัพธ์ Prompt -->
            <div class="lg:col-span-7 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-inner">
                <div>
                    <!-- คัดลอกโค้ดส่วนนี้ไปแทนที่ปุ่มเดิมใน src/pages/prompt.js -->
                <div class="flex flex-wrap items-center gap-2 mb-3">
                    <button id="favBtn" class="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 text-sm font-bold py-2 px-4 rounded-xl transition duration-200 flex items-center gap-2 shadow">
                     ⭐ เก็บเข้ารายการโปรด
                    </button>
                    <button id="copyBtn" class="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 text-sm font-bold text-white py-2 px-4 rounded-xl shadow-lg transition duration-200">
                     📋 คัดลอกคำสั่ง
                    </button>
                </div>
                    <pre id="outputPrompt" class="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-300 max-h-[60vh] md:h-[500px] overflow-y-auto bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 font-mono select-all"></pre>
                </div>
            </div>

        </div>
    </div>
    `;
}