// src/prompt/favoriteBuilder.js
import { db } from "../firebase/firebase.js";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Spinner, SkeletonCard } from "../components/ui.js";

export async function initFavoriteBuilder() {
    const grid = document.getElementById("favoriteCardsGrid");
    if (!grid) return;

    // create or reuse loading indicator and status
    let loadingEl = document.getElementById('favoriteLoading');
    let statusEl = document.getElementById('favoriteStatus');

    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'favoriteStatus';
        statusEl.className = 'col-span-full text-center py-2 text-slate-400 text-xs';
        grid.parentNode.insertBefore(statusEl, grid);
    }

    if (!loadingEl) {
        loadingEl = document.createElement('div');
        loadingEl.id = 'favoriteLoading';
        loadingEl.className = 'col-span-full text-center py-6 text-slate-400 text-xs';
        loadingEl.innerHTML = Spinner(20, 'กำลังโหลดรายการโปรด...');
        loadingEl.style.display = 'none';
        grid.parentNode.insertBefore(loadingEl, grid);
    }

    function renderSkeletons(count = 6) {
        grid.innerHTML = Array.from({length: count}).map(() => SkeletonCard()).join('\n');
    }

    function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

    async function loadWithRetry(maxAttempts = 4, baseDelay = 500) {
        // show skeletons and loading
        renderSkeletons(6);
        loadingEl.style.display = 'block';
        statusEl.innerText = '';

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                if (attempt > 1) statusEl.innerText = `❗ พยายามเชื่อมต่ออีกครั้ง (${attempt}/${maxAttempts})...`;

                const q = query(collection(db, "favorites"), orderBy("savedAt", "desc"));
                const snapshot = await getDocs(q);

                loadingEl.style.display = 'none';
                statusEl.innerText = '';

                if (snapshot.empty) {
                    grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 text-xs">ยังไม่มีรายการโปรด กด ⭐ หน้าสร้าง Prompt เพื่อบันทึกไว้ได้เลย</div>`;
                    return;
                }

                const list = snapshot.docs.map(s => ({ id: s.id, ...s.data() }));

                grid.innerHTML = list.map(item => `
                    <div id="fav-card-${item.id}" class="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/20">${item.modelId || item.platform || item.language || 'Saved Prompt'}</span>
                                <div class="flex gap-2 items-center">
                                    <button data-use-id="${item.id}" class="fav-use-btn text-xs bg-emerald-600 text-white px-2 py-1 rounded">➡ ใช้</button>
                                    <button data-delete-id="${item.id}" class="fav-delete-btn text-xs text-slate-500 hover:text-rose-400">🗑️ ลบ</button>
                                </div>
                            </div>
                            <pre class="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-900 font-mono mb-3 line-clamp-4 whitespace-pre-wrap">${(item.content || '').replace(/</g, '&lt;')}</pre>
                        </div>
                        <div class="flex justify-end pt-2 border-t border-slate-800/60">
                            <button data-copy="${encodeURIComponent(item.content || '')}" class="fav-copy-btn bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-1.5 px-3 rounded-xl transition">📋 คัดลอกคำสั่ง</button>
                        </div>
                    </div>
                `).join('\n');

                // attach listeners
                document.querySelectorAll('.fav-copy-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const text = decodeURIComponent(e.currentTarget.dataset.copy || '');
                        navigator.clipboard.writeText(text).then(() => {
                            const old = e.currentTarget.innerText;
                            e.currentTarget.innerText = '✅ คัดลอกแล้ว';
                            setTimeout(() => e.currentTarget.innerText = old, 2000);
                        }).catch(() => {
                            alert('คัดลอกไม่สำเร็จ');
                        });
                    });
                });

                document.querySelectorAll('.fav-use-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.currentTarget.dataset.useId;
                        const item = list.find(i => i.id === id);
                        if (!item) return;
                        // store and navigate to prompt page
                        try {
                            window.sessionStorage.setItem('selectedFavorite', JSON.stringify(item));
                        } catch (err) { console.warn('sessionStorage unavailable', err); }
                        window.history.pushState({}, '', '/prompt');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                    });
                });

                document.querySelectorAll('.fav-delete-btn').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const id = e.currentTarget.dataset.deleteId;
                        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้ออกจากรายการโปรด?')) return;
                        const btnEl = e.currentTarget;
                        btnEl.disabled = true;
                        try {
                            await deleteDoc(doc(db, 'favorites', id));
                            document.getElementById(`fav-card-${id}`)?.remove();
                        } catch (err) {
                            alert('ลบไม่สำเร็จ');
                            console.error(err);
                            btnEl.disabled = false;
                        }
                    });
                });

                return; // success

            } catch (err) {
                console.error('Failed loading favorites (attempt', attempt, '):', err);
                const delay = baseDelay * Math.pow(2, attempt - 1);
                if (attempt === maxAttempts) {
                    loadingEl.style.display = 'none';
                                    statusEl.innerHTML = `<div>เกิดข้อผิดพลาดในการโหลดข้อมูล: ${err.message || 'Unknown'}</div><div class="mt-2"><button id="favoriteRetryBtn" class="px-3 py-1 text-xs rounded bg-indigo-600">ลองอีกครั้ง</button></div>`;
                                    grid.innerHTML = `<div class="col-span-full text-center py-12 text-rose-400 text-xs">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>`;
                                    // attach manual retry
                                    setTimeout(() => {
                                        const retryBtn = document.getElementById('favoriteRetryBtn');
                                        if (retryBtn) {
                                            retryBtn.addEventListener('click', () => {
                                                loadWithRetry(maxAttempts, baseDelay);
                                            });
                                        }
                                    }, 50);
                                    return;
                                }
                statusEl.innerText = `❗ การเชื่อมต่อล้มเหลว (${attempt}/${maxAttempts}). จะลองอีกครั้งใน ${Math.round(delay/1000)} วินาที...`;
                const jitter = Math.floor(Math.random() * 200);
                await sleep(delay + jitter);
                // continue
            }
        }
    }

    // start
    loadWithRetry();
}
