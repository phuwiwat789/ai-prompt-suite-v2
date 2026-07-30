// src/app/app.js
import { render, navigate } from "./router.js";

export function startApplication() {
    console.log("AI Prompt Suite Infinite v2.0");

    // 1. โหลดหน้าเพจปัจจุบัน (หรือไปที่ / ถ้าเพิ่งเปิดเว็บ)
    const currentPath = window.location.pathname || "/";
    render(currentPath);

    // 2. เริ่มต้นระบบการคลิกเมนู (Event Delegation)
    initNavigation();
}

function initNavigation() {
    // ใช้ event click ที่ระดับ document เพื่อให้ปุ่มที่ถูกสร้างใหม่ทำงานได้เสมอ
    document.addEventListener("click", (e) => {
        const menuItem = e.target.closest("li[data-path]");
        if (menuItem) {
            const targetPath = menuItem.getAttribute("data-path");
            navigate(targetPath);
            return;
        }

        // ปุ่มใช้แม่แบบจาก Library: data-template contains encoded JSON
        const useBtn = e.target.closest("button[data-template]");
        if (useBtn) {
            try {
                const payload = JSON.parse(decodeURIComponent(useBtn.getAttribute('data-template')));
                window.sessionStorage.setItem('selectedTemplate', JSON.stringify(payload));
                // navigate to prompt using history API and trigger router
                window.history.pushState({}, '', '/prompt');
                window.dispatchEvent(new PopStateEvent('popstate'));
            } catch (err) {
                console.error('Failed to load template', err);
            }
            return;
        }

        // ปุ่มคัดลอกคำสั่งบน Library
        const copyBtn = e.target.closest('button[data-copytemplate]');
        if (copyBtn) {
            try {
                const payload = JSON.parse(decodeURIComponent(copyBtn.getAttribute('data-copytemplate')));
                navigator.clipboard.writeText(payload.prompt || '').then(() => {
                    const old = copyBtn.innerText;
                    copyBtn.innerText = '✅ คัดลอกแล้ว';
                    setTimeout(() => copyBtn.innerText = old, 1500);
                });
            } catch (err) {
                console.error('Failed to copy template', err);
            }
            return;
        }
    });

    // รองรับปุ่ม Back / Forward บนเบราว์เซอร์
    window.addEventListener("popstate", () => {
        render(window.location.pathname);
    });
}