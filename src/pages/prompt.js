// src/pages/prompt.js
import { personasDB } from "../data/personas.js";
import { aiModelsDB } from "../data/models.js";

export default function PromptPage() {
    return `
    <div class="max-w-6xl mx-auto p-4 sm:p-6">
        <div class="page-card backglass p-6 mb-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div class="badge-cyber">AI Prompt Suite Infinite</div>
                    <h1 class="text-3xl sm:text-4xl font-black text-white mt-4">🧠 Prompt Builder</h1>
                    <p class="text-sm text-slate-300 mt-2">Modern Cyber-SaaS experience with lower click friction for creators and engineers.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge-cyber">Glassmorphism</span>
                    <span class="badge-cyber">Quick Presets</span>
                    <span class="badge-cyber">Mobile Tab UX</span>
                </div>
            </div>
        </div>

        <div class="mobile-tab-switcher mb-4">
            <button id="tabSettingsBtn" class="tab-pill tab-pill-active" type="button">ตั้งค่าคำสั่ง</button>
            <button id="tabOutputBtn" class="tab-pill" type="button">ดูผลลัพธ์</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[1.03fr_0.97fr] gap-6">
            <!-- ซ้าย: การตั้งค่าพารามิเตอร์ -->
            <div id="settingsTabPanel" class="mobile-tab-panel active">
                <div class="page-panel backglass p-6 space-y-5">
                    <div class="section-title"><span>[INPUT]</span> กำหนดรายละเอียด Prompt</div>

                    <div id="personaSection" class="section-panel space-y-4">
                        <div class="section-tag">[PERSONA]</div>
                        <label class="block text-sm font-semibold text-slate-300">บทบาทผู้เชี่ยวชาญ (AI Persona)</label>
                        <select id="personaSelect" class="w-full p-3 border border-white/10 rounded-3xl bg-white/5 text-sm text-white backdrop-blur-sm">
                            <option value="ผู้เชี่ยวชาญระดับสูง">ผู้เชี่ยวชาญระดับสูงทั่วไป</option>
                            <option value="Senior Full-Stack Developer">Senior Full-Stack Developer</option>
                            <option value="นักการตลาด Digital Marketing Strategy Specialist">นักการตลาด Digital Marketing Strategy Specialist</option>
                            <option value="นักเขียน Copywriter ยอดขายสูง">นักเขียน Copywriter ยอดขายสูง</option>
                        </select>

                        <div id="personaChipsContainer" class="mt-3 flex flex-wrap gap-2"></div>
                    </div>

                    <div class="section-panel space-y-4">
                        <div class="section-tag">[TYPE]</div>
                        <label class="block text-sm font-semibold text-slate-300">ประเภทผลลัพธ์</label>
                        <select id="mediaTypeInput" class="w-full p-3 border border-white/10 rounded-3xl bg-white/5 text-sm text-white backdrop-blur-sm">
                            <option value="text">📝 ข้อความ / แผนงาน / โค้ด</option>
                            <option value="image">🎨 ภาพกราฟิก AI / Prompt ภาพ</option>
                            <option value="code">💻 โค้ด / Snippet</option>
                        </select>
                    </div>

                    <div class="section-panel space-y-4">
                        <div class="section-tag">[ENGINE]</div>
                        <label class="block text-sm font-semibold text-slate-300">เลือกรุ่นปัญญาประดิษฐ์ (Target Model)</label>
                        <select id="aiModelSelect" class="w-full p-3 border border-white/10 rounded-3xl bg-white/5 text-sm text-cyan-300 font-medium backdrop-blur-sm">
                            <option value="chatgpt">🟢 ChatGPT (GPT-4o / o1)</option>
                            <option value="claude">🟠 Claude 3.5 Sonnet</option>
                            <option value="gemini">🔵 Gemini 1.5 Pro</option>
                            <option value="deepseek">🐳 DeepSeek V3 / R1</option>
                        </select>

                        <div id="modelCardsContainer" class="mt-3 flex flex-wrap gap-2"></div>
                    </div>

                    <div id="languageSection" class="section-panel space-y-4" style="display:none;">
                        <div class="section-tag">[LANGUAGE]</div>
                        <label class="block text-sm font-semibold text-slate-300">ภาษาโปรแกรม (สำหรับโหมดโค้ด)</label>
                        <select id="codingLanguageSelect" class="w-full p-3 border border-white/10 rounded-3xl bg-white/5 text-sm text-white backdrop-blur-sm"></select>
                        <label class="inline-flex items-center gap-2 text-sm text-slate-400 mt-2"><input id="includeTestsCheck" type="checkbox" class="form-checkbox"/> รวม Unit Tests หากเป็นไปได้</label>
                    </div>

                    <div class="section-panel space-y-4">
                        <div class="section-tag">[OBJECTIVE]</div>
                        <label class="block text-sm font-semibold text-slate-300">สิ่งที่ต้องการให้ AI ทำ (Task Requirement)</label>
                        <textarea id="taskInput" rows="4" placeholder="ระบุภารกิจหรือเป้าหมายที่ต้องการ..." class="w-full p-3 border border-white/10 rounded-2xl bg-white/5 text-sm text-white backdrop-blur-sm focus:outline-none focus:border-indigo-500"></textarea>

                        <div id="quickTaskChipsContainer" class="mt-3 flex flex-wrap gap-2"></div>
                    </div>

                    <div id="audienceSection" class="section-panel space-y-4">
                        <div class="section-tag">[TARGET & STYLE]</div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-slate-400 mb-1">กลุ่มเป้าหมาย (Audience)</label>
                                <input type="text" id="audienceInput" value="คนทำงานยุคใหม่ / นักพัฒนา" class="w-full p-3 border border-white/10 rounded-2xl bg-white/5 text-sm text-white backdrop-blur-sm" />
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-400 mb-1">สไตล์และโทนเสียง (Tone)</label>
                                <input type="text" id="styleInput" value="กระชับ มีน้ำหนัก เป็นมืออาชีพ" class="w-full p-3 border border-white/10 rounded-2xl bg-white/5 text-sm text-white backdrop-blur-sm" />
                            </div>
                        </div>
                        <div class="mt-2 flex items-center gap-3">
                            <label class="text-xs text-slate-400">สัดส่วน/อัตราส่วน (Ratio)</label>
                            <input id="ratioInput" type="text" value="16:9" class="p-2 bg-[#081627] border border-slate-700 rounded-xl text-sm text-white" />
                            <label class="inline-flex items-center gap-2 text-sm text-slate-400 ml-auto"><input id="complianceCheck" type="checkbox" class="form-checkbox"/> ปฎิบัติตามนโยบาย Compliance</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ขวา: เทอร์มินัลแสดงผลลัพธ์แบบ Real-time -->
            <div id="outputTabPanel" class="mobile-tab-panel">
                <div class="terminal-box flex flex-col h-full min-h-[500px]">
                    <div class="terminal-header flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                            <span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                            <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                            <span class="terminal-label ml-2">SYSTEM_PROMPT_OUTPUT.md</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span id="tokenCount" class="text-xs text-cyan-400 font-mono">Token ~0</span>
                            <span id="charCount" class="text-xs text-cyan-400 font-mono">Chars 0</span>
                            <button id="fullscreenBtn" class="pill-btn small">⛶ ขยายเต็มจอ</button>
                        </div>
                    </div>
                    
                    <pre id="outputPrompt" class="terminal-body flex-1 overflow-y-auto whitespace-pre-wrap select-all font-mono text-slate-300 p-4 leading-relaxed"></pre>
                    
                    <div class="flex flex-wrap gap-3 p-5 border-t border-slate-800/40 bg-[#091827]">
                        <button id="favBtn" class="pill-btn pill-btn-secondary">⭐ บันทึกรายการโปรด</button>
                        <button id="copyBtn" class="pill-btn pill-btn-primary">📋 คัดลอกคำสั่ง</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="toastWrapper" class="fixed right-6 bottom-6 z-50"></div>
    </div>
    `;
}