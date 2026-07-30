// src/prompt/generator.js

import { generateCodingPrompt } from "./codingEngine.js";

export function generatePrompt(config) {
    const {
        mediaType,
        model,
        modelId,
        language,
        persona,
        task,
        audience,
        style,
        ratio,
        isCompliance,
        includeTests,
        // allow other language-specific fields to be passed through
        ...rest
    } = config;

    const resolvedModel = model || modelId || "(model)";

    // 1. กรณีเป็นงานสร้างภาพ (Image Generation)
    if (mediaType === 'image') {
        return `### IMAGE GENERATION PROMPT (${resolvedModel}) ###\n` +
               `/imagine prompt: A high quality visual depicting ${task}, designed in a ${style} style. Highest fidelity, sharp focus, 8k resolution --ar ${ratio}`;
    }

    // 2. กรณีเป็นงาน Code -> ใช้ codingEngine
    if (mediaType === 'code') {
        // Prepare inputs for coding engine
        const inputs = {
            ...rest,
            taskGoal: task,
            codeStyle: style,
            includeTests: !!includeTests,
            isCompliance: !!isCompliance
        };

        const codingPrompt = generateCodingPrompt(language || 'javascript', inputs);

        // Wrap with system header including persona and model
        let promptResult = `### SYSTEM INSTRUCTION FOR ${resolvedModel} ###\n\n`;
        promptResult += `[ROLE & PERSONA]\n- Act as an expert ${persona}.\n\n`;
        promptResult += `[OBJECTIVE / TASK]\n- Your primary mission is to: ${task}\n\n`;
        promptResult += `---\n`;
        promptResult += codingPrompt;
        return promptResult;
    }

    // 3. กรณีเป็นงาน Text, Data หรืออื่นๆ (Structured System Prompt)
    let promptResult = `### SYSTEM INSTRUCTION FOR ${resolvedModel} ###\n\n`;
    promptResult += `[ROLE & PERSONA]\n- Act as an expert ${persona}.\n\n`;
    promptResult += `[OBJECTIVE / TASK]\n- Your primary mission is to: ${task}\n\n`;
    promptResult += `[TARGET AUDIENCE]\n- Tailor your tone, depth, and vocabulary for: ${audience}\n\n`;
    promptResult += `[STYLE & OUTPUT GUIDELINES]\n- Format & Tone: ${style}\n- Use clear headings, bullet points, or structured code/tables where appropriate.\n`;
    
    // หากเปิดโหมดรักษาความปลอดภัยข้อมูล (PDPA / GDPR)
    if (isCompliance) {
        promptResult += `\n[🚨 COMPLIANCE & DATA SAFETY MANDATE]\n` +
                        `- You MUST strictly adhere to GDPR & PDPA privacy standards.\n` +
                        `- Anonymize all personal data, financial credentials, and proprietary business secrets.\n` +
                        `- Ensure zero copyright violation or hallucinated citations.`;
    }

    return promptResult;
}