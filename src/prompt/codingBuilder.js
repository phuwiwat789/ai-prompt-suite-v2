// src/prompt/codingBuilder.js
import { codingLanguagesDB } from "../data/codingLanguages.js";
import { generateCodingPrompt } from "./codingEngine.js";
import { saveToHistory, saveToFavorites } from "../services/firestore.js";

export function initCodingBuilder() {
    // Support both ids: codingLangSelect (user-provided) or codingLanguageSelect (existing in Prompt page)
    const langSelect = document.getElementById("codingLangSelect") || document.getElementById("codingLanguageSelect");
    const dynamicFields = document.getElementById("codingDynamicFields");
    const langDesc = document.getElementById("codingLangDesc");
    const codingOutput = document.getElementById("codingOutput");
    const copyBtn = document.getElementById("codingCopyBtn");
    const favBtn = document.getElementById("codingFavBtn");
    const includeTestsCheck = document.getElementById("includeTestsCheck");
    const complianceCheck = document.getElementById("codingComplianceCheck");

    if (!langSelect) return;

    function renderDynamicFields() {
        const langKey = langSelect.value;
        const langData = codingLanguagesDB[langKey];
        
        if (langDesc) langDesc.innerText = langData.description || "";
        if (!dynamicFields) return;

        dynamicFields.innerHTML = "";

        (langData.fields || []).forEach(field => {
            const wrapper = document.createElement("div");
            const label = document.createElement("label");
            label.className = "block text-[10px] font-bold text-cyan-400 uppercase mb-1";
            label.innerText = `⚙️ ${field.replace(/([A-Z])/g, ' $1').toUpperCase()}`;
            
            const input = document.createElement("input");
            input.type = "text";
            input.dataset.field = field;
            input.className = "w-full p-2 border border-slate-700 rounded-xl text-xs bg-slate-950 text-white coding-input";
            input.placeholder = `ระบุข้อกำหนด ${field}...`;
            
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            dynamicFields.appendChild(wrapper);
            
            input.addEventListener("input", updatePrompt);
        });

        updatePrompt();
    }

    function updatePrompt() {
        const langKey = langSelect.value;
        const inputs = {
            includeTests: includeTestsCheck?.checked || false,
            isCompliance: complianceCheck?.checked || false
        };

        document.querySelectorAll(".coding-input").forEach(input => {
            inputs[input.dataset.field] = input.value;
        });

        const promptText = generateCodingPrompt(langKey, inputs);
        if (codingOutput) codingOutput.innerText = promptText;
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const text = codingOutput ? codingOutput.innerText : "";
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.innerText = "✅ คัดลอกแล้ว!";
                saveToHistory({
                    type: "coding",
                    language: langSelect.value,
                    content: text
                });
                setTimeout(() => { copyBtn.innerText = "📋 คัดลอกคำสั่ง"; }, 2000);
            });
        });
    }

    if (favBtn) {
        favBtn.addEventListener("click", async () => {
            favBtn.innerText = "⏳ บันทึก...";
            try {
                await saveToFavorites({
                    type: "coding",
                    language: langSelect.value,
                    content: codingOutput ? codingOutput.innerText : ""
                });
                favBtn.innerText = "⭐ บันทึกสำเร็จ!";
            } catch (e) {
                favBtn.innerText = "❌ ผิดพลาด";
            }
            setTimeout(() => { favBtn.innerText = "⭐ บันทึกโปรด"; }, 2000);
        });
    }

    langSelect.addEventListener("change", renderDynamicFields);
    includeTestsCheck?.addEventListener("change", updatePrompt);
    complianceCheck?.addEventListener("change", updatePrompt);

    renderDynamicFields();
}
