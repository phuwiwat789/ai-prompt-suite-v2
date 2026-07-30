// src/components/ui.js
export function Spinner(size = 24, text = '') {
    return `
    <div class="flex items-center justify-center gap-2">
        <svg class="animate-spin text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="${size}" height="${size}">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        ${text ? `<span class="text-xs text-slate-400">${text}</span>` : ''}
    </div>
    `;
}

export function SkeletonCard() {
    return `
    <div class="bg-slate-900 p-4 rounded-lg border border-slate-800 animate-pulse">
        <div class="h-4 bg-slate-800 rounded w-1/3 mb-3"></div>
        <div class="h-24 bg-slate-800 rounded mb-3"></div>
        <div class="flex justify-end">
            <div class="h-8 w-20 bg-slate-800 rounded"></div>
        </div>
    </div>
    `;
}