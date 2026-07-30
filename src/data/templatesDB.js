// src/data/templatesDB.js
export const templatesDB = [
    {
        id: "tpl-01",
        title: "สรุปบทความ / หนังสือ แบบ Executive Summary",
        category: "Business",
        tags: ["Summary", "Business", "Reading"],
        prompt: "ช่วยสรุปเนื้อหาสำคัญของ [ใส่ชื่อบทความ/หนังสือ] ให้เป็น Executive Summary สำหรับผู้บริหาร โดยแบ่งเป็น 3 ส่วน: 1. Key Takeaways 3 ข้อ 2. Actionable Insights ที่นำไปใช้ได้ทันที 3. Risk Warning ที่ต้องระวัง"
    },
    {
        id: "tpl-02",
        title: "เขียน Cold Email เสนอขายบริการ B2B",
        category: "Marketing",
        tags: ["Email", "Sales", "B2B"],
        prompt: "จงเขียน Cold Email สั้นไม่เกิน 150 คำ ถึง [ตำแหน่งเป้าหมาย] เพื่อเสนอแก้ปัญหา [ระบุปัญหา] โดยเน้นการสร้างความเชื่อมั่น ไม่ยัดเยียดขาย และจบด้วยคำถามเปิด (Open-ended CTA) เพื่อขอคอล 15 นาที"
    },
    {
        id: "tpl-03",
        title: "Refactor โค้ดให้เป็น Clean Code & High Performance",
        category: "Coding",
        tags: ["Refactoring", "Clean Code", "Dev"],
        prompt: "ช่วยรีแฟกเตอร์ (Refactor) โค้ดชุดนี้ให้เป็นไปตามหลัก Clean Code, ลด Code Duplication, เพิ่ม Type Hints/JSDoc และปรับปรุง Performance ให้ทำงานไวขึ้น พร้อมอธิบายจุดที่แก้ไขทีละข้อ"
    },
    {
        id: "tpl-04",
        title: "วางกลยุทธ์ Content Plan 30 วัน",
        category: "Creator",
        tags: ["Content Plan", "Social Media", "Strategy"],
        prompt: "วางแผนคอนเทนต์สำหรับแพลตฟอร์ม [ระบุแพลตฟอร์ม] ระยะเวลา 30 วัน สำหรับธุรกิจ [ระบุประเภทธุรกิจ] โดยแบ่งสัดส่วนเป็น Content ให้ความรู้ 40%, Content สร้างความผูกพัน 30%, Content ขาย 20% และ Viral Content 10%"
    }
];