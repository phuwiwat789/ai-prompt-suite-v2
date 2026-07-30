// src/data/models.js
export const aiModelsDB = {
    // กลุ่มโมเดลข้อความ / การวิเคราะห์ / เขียนโค้ด
    text: [
        { id: "chatgpt", name: "ChatGPT (GPT-4o / o1)", provider: "OpenAI" },
        { id: "claude", name: "Claude 3.5 Sonnet / Opus", provider: "Anthropic" },
        { id: "gemini", name: "Gemini 1.5 Pro / Flash", provider: "Google" },
        { id: "grok", name: "Grok 2 / Grok 3", provider: "xAI" },
        { id: "deepseek", name: "DeepSeek V3 / R1", provider: "DeepSeek" }
    ],
    // กลุ่มโมเดลสร้างภาพและกราฟิก
    image: [
        { id: "midjourney", name: "Midjourney v6.1", provider: "Midjourney" },
        { id: "flux", name: "Flux.1 (Dev / Schnell)", provider: "Black Forest Labs" },
        { id: "ideogram", name: "Ideogram v2 (Typography & Graphic)", provider: "Ideogram" }
    ]
};