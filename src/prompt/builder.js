// src/prompt/builder.js
import { personasDB } from "../data/personas.js";
import { aiModelsDB } from "../data/models.js";
import { codingLanguagesDB } from "../data/codingLanguages.js";
import { generatePrompt } from "./generator.js";
import { saveToHistory, saveToFavorites } from "../services/firestore.js";

export function initPromptBuilder() {
    const mediaTypeInput = document.getElementById("mediaTypeInput");
    const personaSelect = document.getElementById("personaSelect");
    const aiModelSelect = document.getElementById("aiModelSelect");
    const codingLanguageSelect = document.getElementById("codingLanguageSelect");
    const includeTestsCheck = document.getElementById("includeTestsCheck");
    const outputPrompt = document.getElementById("outputPrompt");
    const copyBtn = document.getElementById("copyBtn");
    const favBtn = document.getElementById("favBtn");

    if (!mediaTypeInput) return;

    // 1. โหลดข้อมูล Persona ลงใน Dropdown
    function renderPersonas() {
        personaSelect.innerHTML = "";
        for (const [group, items] of Object.entries(personasDB)) {
            const optgroup = document.createElement("optgroup");
            optgroup.label = group;
            items.forEach(item => {
                const opt = document.createElement("option");
                opt.value = opt.text = item;
                optgroup.appendChild(opt);
            });
            personaSelect.appendChild(optgroup);
        }
    }

    // 1b. โหลดรายการภาษาโปรแกรม (สำหรับ mediaType === 'code')
    function renderCodingLanguages() {
        if (!codingLanguageSelect) return;
        codingLanguageSelect.innerHTML = "";
        Object.entries(codingLanguagesDB).forEach(([key, meta]) => {
            const opt = document.createElement("option");
            opt.value = key;
            opt.text = meta.name;
            codingLanguageSelect.appendChild(opt);
        });
    }

    // 2. สลับ AI Models และซ่อน/แสดงช่องกรอกข้อมูลตามประเภทที่เลือก
    function handleMediaTypeChange() {
        const type = mediaTypeInput.value;
        const isImage = type === "image";
        const isCode = type === "code";

        // แสดง/ซ่อน เมนูตามความเหมาะสมของสายงาน
        document.getElementById("personaSection").style.display = isImage ? "none" : "block";
        document.getElementById("audienceSection").style.display = isImage ? "none" : "block";
        document.getElementById("ratioSection").style.display = isImage ? "block" : "none";

        // แสดง/ซ่อน ส่วนของภาษาโปรแกรมเมื่อเลือกประเภท "code"
        const langSection = document.getElementById("languageSection");
        if (langSection) langSection.style.display = isCode ? "block" : "none";

        // โหลดรายชื่อ AI models ตามประเภท (Text LLMs vs Image AI)
        aiModelSelect.innerHTML = "";
        const modelsList = aiModelsDB[type] || aiModelsDB.text;
        modelsList.forEach(m => {
            const opt = document.createElement("option");
            opt.value = m.id;
            opt.text = `${m.name} (${m.provider})`;
            aiModelSelect.appendChild(opt);
        });

        // ถ้าเป็นโหมดเขียนโค้ด ให้โหลดรายการภาษา
        if (isCode && codingLanguageSelect) {
            renderCodingLanguages();
            // Attach change listener once
            if (!codingLanguageSelect.__hasChangeListener) {
                codingLanguageSelect.addEventListener("change", update);
                codingLanguageSelect.__hasChangeListener = true;
            }
        }

        update();
    }

    // 3. ฟังก์ชันประมวลผลข้อความ Prompt ล่าสุด
    function update() {
        const config = {
            mediaType: mediaTypeInput.value,
            modelId: aiModelSelect.value,
            language: codingLanguageSelect?.value || "",
            persona: personaSelect.value,
            task: document.getElementById("taskInput").value,
            audience: document.getElementById("audienceInput")?.value || "",
            style: document.getElementById("styleInput")?.value || "",
            ratio: document.getElementById("ratioInput")?.value || "16:9",
            isCompliance: document.getElementById("complianceCheck")?.checked || false,
            includeTests: includeTestsCheck?.checked || false
        };

        const resultText = generatePrompt(config);
        if (outputPrompt) outputPrompt.innerText = resultText;
    }

    function getCurrentPromptData() {
        return {
            mediaType: mediaTypeInput.value,
            modelId: aiModelSelect.value,
            language: codingLanguageSelect?.value || "",
            persona: personaSelect.value,
            task: document.getElementById("taskInput").value,
            includeTests: includeTestsCheck?.checked || false,
            content: outputPrompt.innerText
        };
    }

    // 4. บันทึกประวัติ + คัดลอก
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(outputPrompt.innerText).then(() => {
                copyBtn.innerText = "✅ คัดลอกแล้ว!";
                saveToHistory(getCurrentPromptData());
                setTimeout(() => { copyBtn.innerText = "📋 คัดลอกคำสั่ง"; }, 2000);
            });
        });
    }

    // 5. บันทึกรายการโปรด
    if (favBtn) {
        favBtn.addEventListener("click", async () => {
            favBtn.innerText = "⏳ บันทึก...";
            try {
                await saveToFavorites(getCurrentPromptData());
                favBtn.innerText = "⭐ บันทึกสำเร็จ!";
            } catch (e) {
                favBtn.innerText = "❌ ผิดพลาด";
            } setTimeout(() => { favBtn.innerText = "⭐ เก็บเข้ารายการโปรด"; }, 2000);
        });
    }

    // ดักจับ Event เมื่อมีการเปลี่ยนแปลงข้อมูล
    mediaTypeInput.addEventListener("change", handleMediaTypeChange);
    personaSelect.addEventListener("change", update);
    aiModelSelect.addEventListener("change", update);
    document.getElementById("taskInput").addEventListener("input", update);
    document.getElementById("audienceInput")?.addEventListener("input", update);
    document.getElementById("styleInput")?.addEventListener("input", update);
    document.getElementById("ratioInput")?.addEventListener("change", update);
    document.getElementById("complianceCheck")?.addEventListener("change", update);
    includeTestsCheck?.addEventListener("change", update);

    renderPersonas();
    handleMediaTypeChange();

    // ถ้ามี template ถูกเลือกจาก Library หรือ Favorite ให้โหลดข้อมูลเข้าไปในฟอร์ม
    try {
        const rawTpl = window.sessionStorage.getItem('selectedTemplate');
        const rawFav = window.sessionStorage.getItem('selectedFavorite');
        const taskEl = document.getElementById('taskInput');

        if (rawTpl) {
            const tpl = JSON.parse(rawTpl);
            if (taskEl && tpl.prompt) taskEl.value = tpl.prompt;
            // Optionally fill other fields if provided
            if (tpl.persona) personaSelect.value = tpl.persona;
            if (tpl.language && codingLanguageSelect) codingLanguageSelect.value = tpl.language;
            window.sessionStorage.removeItem('selectedTemplate');
            update();
        }

        if (rawFav) {
            const fav = JSON.parse(rawFav);
            if (taskEl && fav.content) taskEl.value = fav.content;
            if (fav.modelId) {
                // try to set modelId if exists in select
                const opt = Array.from(aiModelSelect.options).find(o => o.value === fav.modelId);
                if (opt) aiModelSelect.value = fav.modelId;
            }
            if (fav.language && codingLanguageSelect) {
                const optLang = Array.from(codingLanguageSelect.options).find(o => o.value === fav.language);
                if (optLang) codingLanguageSelect.value = fav.language;
            }
            window.sessionStorage.removeItem('selectedFavorite');
            update();
        }
    } catch (err) {
        console.error('Failed to apply selected template/favorite', err);
    }
}

