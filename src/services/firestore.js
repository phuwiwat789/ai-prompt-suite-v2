// src/services/firestore.js
import { db } from "../firebase/firebase.js";
import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    orderBy, 
    serverTimestamp 
} from "firebase/firestore";

// 1. ฟังก์ชันบันทึกประวัติการสร้าง Prompt (History)
export async function saveToHistory(promptData) {
    try {
        const historyRef = collection(db, "history");
        const docRef = await addDoc(historyRef, {
            ...promptData,
            createdAt: serverTimestamp()
        });
        console.log("✅ บันทึกประวัติสำเร็จ ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ บันทึกประวัติไม่สำเร็จ:", error);
        throw error;
    }
}

// 2. ฟังก์ชันเก็บรายการโปรด (Favorites)
export async function saveToFavorites(promptData) {
    try {
        const favRef = collection(db, "favorites");
        const docRef = await addDoc(favRef, {
            ...promptData,
            savedAt: serverTimestamp()
        });
        console.log("⭐ บันทึกรายการโปรดสำเร็จ ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ บันทึกรายการโปรดไม่สำเร็จ:", error);
        throw error;
    }
}

// 3. ฟังก์ชันดึงประวัติทั้งหมดมาแสดงผล (เรียงจากใหม่ไปเก่า)
export async function getHistoryList() {
    try {
        const q = query(collection(db, "history"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return list;
    } catch (error) {
        console.error("❌ ดึงประวัติไม่สำเร็จ:", error);
        return [];
    }
}

// 4. ฟังก์ชันดึงรายการโปรดทั้งหมดมาแสดงผล (เรียงจากใหม่ไปเก่า)
export async function getFavoritesList() {
    try {
        const q = query(collection(db, "favorites"), orderBy("savedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return list;
    } catch (error) {
        console.error("❌ ดึงรายการโปรดไม่สำเร็จ:", error);
        // Rethrow so callers can implement retry/backoff on transient errors
        throw error;
    }
}

// 5. ฟังก์ชันลบข้อมูลออกจากระบบ
export async function deletePromptItem(collectionName, id) {
    try {
        await deleteDoc(doc(db, collectionName, id));
        console.log(`🗑️ ลบข้อมูล ${id} ออกจาก ${collectionName} เรียบร้อย`);
        return true;
    } catch (error) {
        console.error("❌ ลบข้อมูลไม่สำเร็จ:", error);
        return false;
    }
}

