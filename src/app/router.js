// ==========================================
// FILE: src/app/router.js
// ==========================================

import MainLayout from "../layouts/mainLayout.js";
import { initPromptBuilder } from "../prompt/builder.js";
import { initCreatorBuilder } from "../prompt/creatorBuilder.js";
import { initCodingBuilder } from "../prompt/codingBuilder.js";
import { initLanguageManager } from "../prompt/languageManager.js";
import { initLibraryBuilder } from "../prompt/libraryBuilder.js";
import { initFavoriteBuilder } from "../prompt/favoriteBuilder.js";
import { initHistoryBuilder } from "../prompt/historyBuilder.js";

// นำเข้าหน้า Pages ทั้งหมด
import { DashboardPage } from "../pages/dashboard.js";
import PromptPage from "../pages/prompt.js";
import CreatorPage from "../pages/creator.js";
import CodingPage from "../pages/coding.js";
import { LibraryPage } from "../pages/library.js";
import { FavoritePage } from "../pages/favorite.js";
import { HistoryPage } from "../pages/history.js";
import { SettingsPage } from "../pages/settings.js";
import { NotFound } from "../pages/notfound.js";
import { LanguagesPage } from "../pages/languages.js";

// รายการเส้นทางและหน้าเพจเป้าหมาย
const routes = {
    "/": DashboardPage,
    "/dashboard": DashboardPage,
    "/prompt": PromptPage,
    "/creator": CreatorPage,
    "/coding": CodingPage,
    "/library": LibraryPage,
    "/favorite": FavoritePage,
    "/history": HistoryPage,
    "/settings": SettingsPage,
    "/languages": LanguagesPage
};

// ฟังก์ชันสำหรับเปลี่ยนหน้า (ใช้เชื่อมต่อกับปุ่มเมนูใน Sidebar)
export function navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    render(path);
}

// ฟังก์ชันหลักสำหรับแสดงผลและควบคุมหน้าเพจ
export function render(path) {
    // 1. ตรวจสอบว่ามีหน้าเพจนั้นหรือไม่ (ถ้าไม่มีให้ไปหน้า NotFound)
    const pageComponent = routes[path] || NotFound;
    const contentHtml = typeof pageComponent === "function" ? pageComponent() : "<h1>Page Error</h1>";
    
    // 2. นำเนื้อหามาใส่ใน Layout หลัก (มี Navbar & Sidebar)
    const appContainer = document.getElementById("app") || document.body;
    appContainer.innerHTML = MainLayout(contentHtml);
    
    // 3. ⭐ ตรวจสอบ Path: หากเปิดหน้า Prompt Builder ให้เปิดใช้งานฟังก์ชันโต้ตอบทันที
    if (path === "/prompt") {
        initPromptBuilder();
    } else if (path === "/creator") {
        initCreatorBuilder();
    } else if (path === "/coding") {
        initCodingBuilder();
    }

    // ถ้าเปิดหน้า Library ให้เรียกตัวจัดการ Library
    if (path === "/library") {
        initLibraryBuilder();
    }

    // ถ้าเปิดหน้า Favorite ให้เรียกตัวจัดการ Favorite
    if (path === "/favorite") {
        initFavoriteBuilder();
    }

    // ถ้าเปิดหน้า History ให้เรียกตัวจัดการ History
    if (path === "/history") {
        initHistoryBuilder();
    }

    // ถ้าเปิดหน้า Languages ให้เรียกตัวจัดการภาษา
    if (path === "/languages") {
        initLanguageManager();
    }
}

// ฟังก์ชันสำหรับเรียกโหลดหน้าเริ่มต้น
export function loadPage(path) {
    // ปรับรูปแบบ path ให้มี "/" นำหน้าเสมอเพื่อความถูกต้องของระบบ routes
    const formattedPath = path.startsWith("/") ? path : `/${path}`;
    navigate(formattedPath);
}

export default function Router(path) {
    render(path);
}