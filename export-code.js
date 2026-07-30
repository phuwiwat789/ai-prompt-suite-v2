import fs from 'fs';
import path from 'path';

const rootDir = './src';
const outputFile = 'all_code.txt';
let combinedCode = '';

function readFilesRecursively(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            readFilesRecursively(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            combinedCode += `\n====================================\n`;
            combinedCode += `FILE: ${fullPath}\n`;
            combinedCode += `====================================\n\n`;
            combinedCode += content + `\n`;
        }
    });
}

try {
    readFilesRecursively(rootDir);
    fs.writeFileSync(outputFile, combinedCode, 'utf8');
    console.log('✅ รวมโค้ดสำเร็จ! เปิดไฟล์ all_code.txt เพื่อคัดลอกได้เลยครับ');
} catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message);
}