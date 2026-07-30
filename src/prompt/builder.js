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
    const modelCardsContainer = document.getElementById("modelCardsContainer");
    const codingLanguageSelect = document.getElementById("codingLanguageSelect");
    const includeTestsCheck = document.getElementById("includeTestsCheck");
    const outputPrompt = document.getElementById("outputPrompt");
    const copyBtn = document.getElementById("copyBtn");
    const favBtn = document.getElementById("favBtn");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const tokenCount = document.getElementById("tokenCount");
    const charCount = document.getElementById("charCount");
    const toastWrapper = document.getElementById("toastWrapper");
    const personaChipsContainer = document.getElementById("personaChipsContainer");
    const quickTaskChipsContainer = document.getElementById("quickTaskChipsContainer");
    const tabSettingsBtn = document.getElementById("tabSettingsBtn");
    const tabOutputBtn = document.getElementById("tabOutputBtn");
    const settingsTabPanel = document.getElementById("settingsTabPanel");
    const outputTabPanel = document.getElementById("outputTabPanel");

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

    const personaPresets = [
        "Full-Stack AI Developer",
        "นักเขียนคำโฆษณา (Copywriter)",
        "นักกลยุทธ์การตลาดดิจิทัล (CMO)",
        "UX/UI Designer",
        "ที่ปรึกษาธุรกิจระดับโลก (McKinsey Style)"
    ];

    const quickTaskPresets = [
        "เขียนแคมเปญโฆษณา 30 วันสำหรับเทคสตาร์ทอัพ",
        "สร้างสรุปรายงานกลยุทธ์การเติบโตสำหรับผลิตภัณฑ์ SaaS",
        "แต่งโพสต์ LinkedIn ให้กลุ่มนักพัฒนาซอฟต์แวร์",
        "ร่างสคริปต์วีดีโอสั้นสำหรับโปรโมตแคมเปญ",
        "ออกแบบแผนงานเปิดตัวคุณสมบัติใหม่"
    ];

    function renderPersonaPresets() {
        if (!personaChipsContainer) return;
        personaChipsContainer.innerHTML = personaPresets.map(role => `
            <button type="button" data-preset-persona="${role}" class="preset-chip">${role}</button>
        `).join("");
    }

    function renderQuickTaskPresets() {
        if (!quickTaskChipsContainer) return;
        quickTaskChipsContainer.innerHTML = quickTaskPresets.map(task => `
            <button type="button" data-preset-task="${task}" class="preset-chip">${task}</button>
        `).join("");
    }

    function showToast(message) {
        if (!toastWrapper) return;
        const toast = document.createElement("div");
        toast.className = "toast-toast";
        toast.textContent = message;
        toastWrapper.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add("visible"));
        window.setTimeout(() => {
            toast.classList.remove("visible");
            toast.addEventListener("transitionend", () => toast.remove(), { once: true });
        }, 2000);
    }

    function estimateTokens(text) {
        const trimmed = String(text || "").trim();
        if (!trimmed) return 0;
        const wordCount = trimmed.split(/\s+/).length;
        return Math.max(1, Math.round(wordCount * 1.35));
    }

    function updateCounters() {
        if (!tokenCount || !charCount || !outputPrompt) return;
        const text = outputPrompt.innerText || "";
        tokenCount.innerText = `Token ~${estimateTokens(text)}`;
        charCount.innerText = `Chars ${text.length}`;
    }

    function setActiveModelChip() {
        if (!modelCardsContainer) return;
        modelCardsContainer.querySelectorAll("button[data-model-id]").forEach(btn => {
            btn.classList.toggle("selected", btn.dataset.modelId === aiModelSelect.value);
        });
    }

    function renderModelCards() {
        if (!modelCardsContainer) return;
        const type = mediaTypeInput.value;
        const availableModels = aiModelsDB[type] || aiModelsDB.text;
        aiModelSelect.innerHTML = "";
        availableModels.forEach(model => {
            const opt = document.createElement("option");
            opt.value = model.id;
            opt.text = model.name;
            aiModelSelect.appendChild(opt);
        });

        if (!aiModelSelect.value && availableModels.length > 0) {
            aiModelSelect.value = availableModels[0].id;
        }

        modelCardsContainer.innerHTML = availableModels.map(model => `
            <button type="button" data-model-id="${model.id}" class="model-chip${model.id === aiModelSelect.value ? " selected" : ""}">
                <span>${model.name}</span>
                <small>${model.provider}</small>
            </button>
        `).join("");
    }

    function toggleFullscreen() {
        const terminalBox = document.querySelector(".terminal-box");
        if (!terminalBox || !fullscreenBtn) return;
        const expanded = terminalBox.classList.toggle("terminal-fullscreen");
        fullscreenBtn.innerText = expanded ? "✕ ปิดเต็มจอ" : "⛶ ขยายเต็มจอ";
    }

    function switchMobileTab(tab) {
        if (!settingsTabPanel || !outputTabPanel || !tabSettingsBtn || !tabOutputBtn) return;
        settingsTabPanel.classList.toggle("active", tab === "settings");
        outputTabPanel.classList.toggle("active", tab === "output");
        tabSettingsBtn.classList.toggle("tab-pill-active", tab === "settings");
        tabOutputBtn.classList.toggle("tab-pill-active", tab === "output");
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

        renderModelCards();

        // ถ้าเป็นโหมดเขียนโค้ด ให้โหลดรายการภาษา
        if (isCode && codingLanguageSelect) {
            renderCodingLanguages();
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
        if (outputPrompt) {
            outputPrompt.textContent = resultText;
            updateCounters();
        }
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
            const text = outputPrompt?.textContent || "";
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.innerText = "✅ คัดลอกแล้ว!";
                saveToHistory(getCurrentPromptData());
                showToast("คัดลอกเรียบร้อยแล้ว!");
                setTimeout(() => { copyBtn.innerText = "📋 คัดลอกคำสั่ง"; }, 2000);
            });
        });
    }

    // 5. บันทึกรายการโปรด
    if (favBtn) {
        favBtn.addEventListener("click", async () => {
            favBtn.innerText = "⏳ บันทึก...";
            favBtn.disabled = true;
            try {
                await saveToFavorites(getCurrentPromptData());
                favBtn.innerText = "⭐ บันทึกสำเร็จ!";
                showToast("บันทึกรายการโปรดแล้ว");
            } catch (e) {
                favBtn.innerText = "❌ ผิดพลาด";
                showToast("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง");
            } finally {
                setTimeout(() => { favBtn.innerText = "⭐ เก็บเข้ารายการโปรด"; favBtn.disabled = false; }, 2000);
            }
        });
    }

    if (modelCardsContainer) {
        modelCardsContainer.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-model-id]");
            if (!button) return;
            aiModelSelect.value = button.dataset.modelId || aiModelSelect.value;
            setActiveModelChip();
            update();
        });
    }

    if (personaChipsContainer) {
        personaChipsContainer.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-preset-persona]");
            if (!button) return;
            const persona = button.dataset.presetPersona;
            const option = Array.from(personaSelect.options).find(opt => opt.value === persona);
            if (option) {
                personaSelect.value = persona;
                update();
            }
        });
    }

    if (quickTaskChipsContainer) {
        quickTaskChipsContainer.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-preset-task]");
            if (!button) return;
            const task = button.dataset.presetTask;
            const taskInput = document.getElementById("taskInput");
            if (taskInput) {
                taskInput.value = task;
                update();
            }
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", toggleFullscreen);
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                const terminalBox = document.querySelector(".terminal-box");
                if (terminalBox?.classList.contains("terminal-fullscreen")) {
                    toggleFullscreen();
                }
            }
        });
    }

    if (tabSettingsBtn && tabOutputBtn) {
        tabSettingsBtn.addEventListener("click", () => switchMobileTab("settings"));
        tabOutputBtn.addEventListener("click", () => switchMobileTab("output"));
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
    renderPersonaPresets();
    renderQuickTaskPresets();
    renderModelCards();
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

