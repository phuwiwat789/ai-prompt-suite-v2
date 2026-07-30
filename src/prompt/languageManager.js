// src/prompt/languageManager.js
import { codingLanguagesDB } from "../data/codingLanguages.js";

export function initLanguageManager() {
    const container = document.getElementById("languageManager");
    if (!container) return;

    // Clear container
    container.innerHTML = "";

    // Title
    const title = document.createElement("h3");
    title.innerText = "จัดการภาษาโค้ด (Dev)";
    title.className = "text-lg font-medium mb-2";
    container.appendChild(title);

    // Language select
    const selectWrapper = document.createElement("div");
    selectWrapper.className = "mb-3";
    const langSelect = document.createElement("select");
    langSelect.id = "codingLanguageSelect";
    langSelect.className = "border p-2 rounded w-full";

    Object.entries(codingLanguagesDB).forEach(([key, meta]) => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.text = meta.name;
        langSelect.appendChild(opt);
    });

    selectWrapper.appendChild(langSelect);
    container.appendChild(selectWrapper);

    // Description
    const desc = document.createElement("p");
    desc.id = "codingLanguageDescription";
    desc.className = "text-sm text-gray-600 mb-3";
    container.appendChild(desc);

    // Fields area
    const fieldsArea = document.createElement("div");
    fieldsArea.id = "codingLanguageFields";
    fieldsArea.className = "mb-3 space-y-2";
    container.appendChild(fieldsArea);

    // Preview area
    const preview = document.createElement("pre");
    preview.id = "codingLanguagePreview";
    preview.className = "bg-gray-100 p-2 rounded text-sm overflow-auto";
    preview.style.maxHeight = "200px";
    container.appendChild(preview);

    // Action buttons
    const actions = document.createElement("div");
    actions.className = "flex gap-2 mt-3";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "px-3 py-1 bg-indigo-600 text-white rounded";
    copyBtn.innerText = "📋 คัดลอก JSON";

    const logBtn = document.createElement("button");
    logBtn.type = "button";
    logBtn.className = "px-3 py-1 bg-gray-200 rounded";
    logBtn.innerText = "🔍 แสดงใน Console";

    actions.appendChild(copyBtn);
    actions.appendChild(logBtn);
    container.appendChild(actions);

    // Helpers
    function renderFieldsFor(languageKey) {
        const meta = codingLanguagesDB[languageKey];
        if (!meta) return;
        desc.innerText = meta.description || "";

        fieldsArea.innerHTML = "";
        meta.fields.forEach(field => {
            const wrapper = document.createElement("div");
            wrapper.className = "flex flex-col";

            const label = document.createElement("label");
            label.htmlFor = field + "Input";
            label.className = "text-sm font-medium mb-1";
            // Make label more readable by separating camelCase
            label.innerText = field.replace(/([a-z])([A-Z])/g, "$1 $2");

            const input = document.createElement("input");
            input.id = field + "Input";
            input.dataset.field = field;
            input.className = "border p-2 rounded w-full";
            input.type = "text";
            input.placeholder = "ใส่ค่า " + label.innerText;

            input.addEventListener("input", updatePreview);

            wrapper.appendChild(label);
            wrapper.appendChild(input);
            fieldsArea.appendChild(wrapper);
        });

        updatePreview();
    }

    function getCurrentLanguageData() {
        const lang = langSelect.value;
        const meta = codingLanguagesDB[lang];
        const values = {};
        (meta.fields || []).forEach(field => {
            const el = document.getElementById(field + "Input");
            values[field] = el ? el.value : "";
        });
        return {
            language: lang,
            name: meta.name,
            description: meta.description,
            values
        };
    }

    function updatePreview() {
        const data = getCurrentLanguageData();
        preview.innerText = JSON.stringify(data, null, 2);
    }

    // Event listeners for actions
    copyBtn.addEventListener("click", () => {
        const data = getCurrentLanguageData();
        navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
            const old = copyBtn.innerText;
            copyBtn.innerText = "✅ คัดลอกแล้ว";
            setTimeout(() => copyBtn.innerText = old, 1500);
        }).catch(() => {
            copyBtn.innerText = "❌ ไม่สามารถคัดลอก";
            setTimeout(() => copyBtn.innerText = "📋 คัดลอก JSON", 1500);
        });
    });

    logBtn.addEventListener("click", () => {
        console.log("[Language Manager]", getCurrentLanguageData());
        logBtn.innerText = "✅ แสดงแล้ว";
        setTimeout(() => logBtn.innerText = "🔍 แสดงใน Console", 1500);
    });

    // Initialize
    renderFieldsFor(langSelect.value);
    langSelect.addEventListener("change", () => renderFieldsFor(langSelect.value));
}
