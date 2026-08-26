
// =================================================================
// 🖐️ ১. ULTRA-LIGHTWEIGHT GPU-ACCELERATED DRAGGING (PART 1)
// =================================================================

const powerBtn = document.getElementById('power-toggle-btn');

const predictorPanel = document.getElementById('real-predictor');



let btnIsDragging = false;

let btnStartX = 0, btnStartY = 0;

let btnCurrentX = 0, btnCurrentY = 0;

let btnXOffset = 0, btnYOffset = 0;

let btnHasMoved = false;

let btnAnimationFrameId = null; 



document.addEventListener("DOMContentLoaded", () => {

    if (powerBtn && predictorPanel) {

        if (!predictorPanel.classList.contains("show-panel")) {

            powerBtn.classList.add("panel-hidden");

        }

    }

    if (powerBtn) {

        powerBtn.style.willChange = "transform";

        powerBtn.style.transition = "none";

    }

});



if (powerBtn) {

    powerBtn.addEventListener('mousedown', btnDragStart, { passive: false });

    powerBtn.addEventListener('touchstart', btnDragStart, { passive: false });

}



function btnDragStart(e) {

    btnIsDragging = true;

    btnHasMoved = false;

    

    // আপনার অরিজিনাল জিরো-ল্যাগ টাচ পয়েন্ট ট্র্যাকিং [0] ইনডেক্সিং ফিরিয়ে আনা হলো

    const point = e.type === 'touchstart' ? e.touches[0] : e;

    btnStartX = point.clientX;

    btnStartY = point.clientY;

    

    btnXOffset = btnCurrentX;

    btnYOffset = btnCurrentY;

    

    document.addEventListener('mousemove', btnDragMove, { passive: false });

    document.addEventListener('touchmove', btnDragMove, { passive: false });

    document.addEventListener('mouseup', btnDragEnd, { passive: true });

    document.addEventListener('touchend', btnDragEnd, { passive: true });

}



function btnDragMove(e) {

    if (!btnIsDragging) return;

    

    e.preventDefault(); 

    

    const point = e.type === 'touchmove' ? e.touches[0] : e;

    const dx = point.clientX - btnStartX;

    // আপনার অരിজিনাল কোডের টাইপো ফিক্স করে btnStartY করা হলো

    const dy = point.clientY - btnStartY; 

    

    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {

        btnHasMoved = true;

    }

    

    if (btnHasMoved) {

        // সম্ভাব্য নতুন পজিশন হিসাব

        let proposedX = btnXOffset + dx;

        let targetY = btnYOffset + dy;

        

        // 🔒 বডির বাউন্ডারি লক করার একদম সহজ ও নিখুঁত লজিক

        if (powerBtn) {

            const rect = powerBtn.getBoundingClientRect();

            

            // বাম এবং ডান বাউন্ডারি চেক

            if (rect.left + (proposedX - btnCurrentX) < 0) {

                proposedX = btnCurrentX - rect.left;

            } else if (rect.right + (proposedX - btnCurrentX) > window.innerWidth) {

                proposedX = btnCurrentX + (window.innerWidth - rect.right);

            }

            

            // উপর এবং নিচের বাউন্ডারি চেক

            if (rect.top + (targetY - btnCurrentY) < 0) {

                targetY = btnCurrentY - rect.top;

            } else if (rect.bottom + (targetY - btnCurrentY) > window.innerHeight) {

                targetY = btnCurrentY + (window.innerHeight - rect.bottom);

            }

        }

        

        btnCurrentX = proposedX;

        btnCurrentY = targetY;

        

        if (!btnAnimationFrameId) {

            btnAnimationFrameId = requestAnimationFrame(() => {

                powerBtn.style.transform = `translate3d(${btnCurrentX}px, ${btnCurrentY}px, 0)`; 

                btnAnimationFrameId = null;

            });

        }

    }

}



function btnDragEnd() {

    if (!btnIsDragging) return;

    btnIsDragging = false;

    

    if (btnAnimationFrameId) {

        cancelAnimationFrame(btnAnimationFrameId);

        btnAnimationFrameId = null;

    }

    

    btnXOffset = btnCurrentX;

    btnYOffset = btnCurrentY;

    

    document.removeEventListener('mousemove', btnDragMove);

    document.removeEventListener('touchmove', btnDragMove);

    document.removeEventListener('mouseup', btnDragEnd);

    document.removeEventListener('touchend', btnDragEnd);

    

    if (!btnHasMoved && predictorPanel) {

        predictorPanel.classList.toggle('show-panel');

        powerBtn.classList.toggle('panel-hidden');

        

        const isVisible = predictorPanel.classList.contains('show-panel');

        

        if (!isVisible) {

            showPopupNotification("AI Engine Offline", "#ff0055");

        }

    }

}





// =================================================================

// 🚀 সাইবার টোস্ট নোটিফিকেশন ইঞ্জিন (Glow Toast Function)

// =================================================================

function showPopupNotification(message, color) {

    const oldToast = document.getElementById("ai-popup-toast");

    if (oldToast) oldToast.remove();



    const toast = document.createElement("div");

    toast.id = "ai-popup-toast";

    toast.innerText = message;

    

    // প্রিমিয়াম গ্লাস-মরফিজম ইন-লাইন সিএসএস স্টাইল

    toast.style.position = 'fixed';

    toast.style.top = '35px';

    toast.style.left = '50%';

    toast.style.transform = 'translateX(-50%) scale(1)';

    toast.style.background = 'rgba(10, 11, 14, 0.94)';

    toast.style.backdropFilter = 'blur(12px)';

    toast.style.webkitBackdropFilter = 'blur(12px)';

    toast.style.border = `2px solid ${color}`;

    toast.style.borderRadius = '30px';

    toast.style.padding = '11px 26px';

    toast.style.fontSize = '11px';

    toast.style.fontWeight = '800';

    toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';

    toast.style.letterSpacing = '1px';

    toast.style.textTransform = 'uppercase';

    toast.style.zIndex = '10000001';

    toast.style.pointerEvents = 'none';

    toast.style.boxShadow = `0 0 20px ${color}88, inset 0 0 10px ${color}33`;

    toast.style.color = color;

    toast.style.opacity = '1';

    toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';



    document.body.appendChild(toast);



    // ২.৫ সেকেন্ড পর স্মুথলি আউট-অ্যানিমেশন দিয়ে DOM থেকে ভ্যানিশ করা

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform = "translateX(-50%) translateY(-25px) scale(0.85)";

        setTimeout(() => toast.remove(), 400); 

    }, 500);

}





    

document.addEventListener("DOMContentLoaded", () => {

    // ১. DOM থেকে আপনার অরিজিনাল বাটন এবং প্রেডিক্টর প্যানেল সিলেক্ট করা

    const powerBtn = document.getElementById("power-toggle-btn");

    const predictorPanel = document.getElementById("real-predictor");



    // ২. ইভেন্ট লিসেনার এবং টগল মেকানিজম চালু করা

    if (powerBtn && predictorPanel) {

        // পেজ লোড হওয়ার সময় প্যানেলটি বন্ধ থাকলে বাটনটি ডিফল্ট লাল থাকবে

        if (!predictorPanel.classList.contains("show-panel")) {

            powerBtn.classList.add("panel-hidden");

        }



        powerBtn.addEventListener("click", (e) => {

            e.stopPropagation(); // ড্র্যাগ বাবলিং ও ইন্টারঅ্যাকশন প্রোটেকশন

            

            // মেইন প্যানেল শো বা হাইড টগল করা (CSS ক্লাসের মাধ্যমে)

            predictorPanel.classList.toggle("show-panel");

            

            // আপনার ফিঙ্গারপ্রিন্ট বাটনের কালার স্টেট (সায়ান/লাল) টগল করা

            powerBtn.classList.toggle("panel-hidden");

            

            // বর্তমান ভিজিবিলিটি স্টেট নির্ণয় করা

            const isVisible = predictorPanel.classList.contains("show-panel");

            

            

            if (!isVisible) {

                showPopupNotification("PRESICTOR HIDE", "#ff0055");

            }

        });

    }

});



// =================================================================

// 🚀 সাইবার টোস্ট নোটিফিকেশন ইঞ্জিন (Glow Toast Function)

// =================================================================

function showPopupNotification(message, color) {

    // স্ক্রিনে আগের কোনো টোস্ট থাকলে তা রিমুভ করা

    const oldToast = document.getElementById("ai-popup-toast");

    if (oldToast) oldToast.remove();



    // নতুন টোস্ট এলিমেন্ট তৈরি করা

    const toast = document.createElement("div");

    toast.id = "ai-popup-toast";

    

    // টেক্সট এবং সাইবার নিয়ন গ্লো ডাইনামিকালি সেট করা

    toast.innerText = message;

    toast.style.borderColor = color;

    toast.style.boxShadow = `0 0 20px ${color}88, inset 0 0 10px ${color}33`;

    toast.style.color = color;



    document.body.appendChild(toast);



    // ২.৫ সেকেন্ড পর স্মুথলি আউট-অ্যানিমেশন দিয়ে DOM থেকে ভ্যানিশ করা

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform = "translateX(-50%) translateY(-25px) scale(0.85)";

        setTimeout(() => toast.remove(), 400); // ট্রানজিশন শেষে মেমোরি ক্লিন

    }, 500);

}
(function() {
    const gamesList = [
        { name: "BD WIN 24", url: "https://4bdwin24.com", icon: "", color: "#00d2ff", bg: "#0052d4" },
        { name: "DK WIN", url: "https://dkwin17.com", icon: "", color: "#ffd700", bg: "#f39c12" },
        { name: "HGNICE BD", url: "https://hgnice6.com", icon: "", color: "#ff4757", bg: "#ff416c" },
        { name: "LUCKY WIN", url: "https://luckywin.com", icon: "", color: "#ffd700", bg: "#111111", border: "1px solid #ffd700" }
    ];

    const savedGameIndexKey = 'zx_last_played_game_idx';
    let savedIndex = localStorage.getItem(savedGameIndexKey);
    savedIndex = (savedIndex === null || savedIndex >= gamesList.length) ? 0 : parseInt(savedIndex, 10);
    const defaultGame = gamesList[savedIndex];

    const iframe = document.createElement('iframe');
    iframe.id = 'bg-frame'; iframe.src = defaultGame.url; iframe.setAttribute('allowfullscreen', '');
    document.body.appendChild(iframe);

    const style = document.createElement('style');
    style.innerHTML = `
        .panel-hidden { display: none !important; pointer-events: none !important; opacity: 0 !important; }
        @keyframes zx-soft-breathing {
            0%, 100% { box-shadow: 0 0 12px rgba(143, 160, 221, 0.25), 0 8px 32px rgba(0, 0, 0, 0.65); border-color: rgba(143, 160, 221, 0.2); }
            50% { box-shadow: 0 0 22px rgba(143, 160, 221, 0.45), 0 12px 40px rgba(0, 0, 0, 0.8); border-color: rgba(143, 160, 221, 0.45); }
        }
        @keyframes zx-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        #premium-menu-wrapper { position: fixed; top: 40%; left: 45%; z-index: 999999; display: flex; align-items: center; gap: 8px; font-family: 'Inter', system-ui, -apple-system, sans-serif; width: max-content; max-width: 95vw; cursor: grab; user-select: none; touch-action: none; filter: drop-shadow(0 10px 25px rgba(0,0,0,0.5)); }
        #premium-menu-wrapper:active { cursor: grabbing; }

        #premium-game-switcher { background: linear-gradient(135deg, rgba(14, 18, 36, 0.85) 0%, rgba(6, 8, 18, 0.97) 100%); backdrop-filter: blur(30px) saturate(210%); -webkit-backdrop-filter: blur(30px) saturate(210%); padding: 6px 10px; border-radius: 14px; border: 1px solid rgba(143, 160, 221, 0.25); animation: zx-soft-breathing 4s infinite ease-in-out; display: flex; flex-direction: column; gap: 6px; align-items: stretch; transition: max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1), max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s; overflow: hidden; max-width: 85vw; }
        #premium-game-switcher.hidden-bar { max-width: 0; max-height: 0; padding: 0; border: none; opacity: 0; pointer-events: none; }

        .game-buttons-row { display: flex; gap: 6px; align-items: center; }

        .game-tab-btn { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); color: rgba(255, 255, 255, 0.65); padding: 8px 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 5px; white-space: nowrap; transition: all 0.25s ease; }
        .game-tab-btn:hover { color: #ffffff; background: rgba(255, 255, 255, 0.08); border-color: rgba(143, 160, 221, 0.45); transform: translateY(-1px); }
        .active-tab { box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 3px 10px rgba(0, 0, 0, 0.4) !important; text-shadow: 0 0 8px rgba(255, 255, 255, 0.5); }

        .controls-section { display: flex; flex-direction: column; gap: 6px; padding-top: 6px; border-top: 1px solid rgba(255, 255, 255, 0.06); }
        .toggles-row { display: flex; gap: 6px; width: 100%; }

        .lzr-toggle-btn { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.85); flex: 1; padding: 10px 0; font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s ease; box-shadow: inset 0 1px 2px rgba(255,255,255,0.05); }
        .lzr-toggle-btn.lzr-on { background: linear-gradient(135deg, rgba(46, 213, 115, 0.15), rgba(46, 213, 115, 0.02)); border-color: #2ed573; color: #2ed573; text-shadow: 0 0 6px rgba(46, 213, 115, 0.5); }
        .lzr-toggle-btn.lzr-off { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.7); }
        .lzr-toggle-btn:active { transform: scale(0.97); }

        .server-select-container { width: 100%; display: flex; align-items: center; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 5px 10px; gap: 8px; }
        .server-label { font-size: 10px; font-weight: 800; color: rgba(143, 160, 221, 0.85); letter-spacing: 0.6px; white-space: nowrap; }
        .server-dropdown { background: transparent; border: none; color: #ffffff; font-size: 11px; font-weight: 700; width: 100%; outline: none; cursor: pointer; }
        .server-dropdown option { background: #0e1224; color: #ffffff; }

        #menu-toggle-btn { background: linear-gradient(135deg, #141832 0%, #060814 100%); border: 1.5px solid rgba(143, 160, 221, 0.5); box-shadow: 0 0 12px rgba(143, 160, 221, 0.45); width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.85); font-size: 13px; flex-shrink: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        #menu-toggle-btn:hover { color: #ffffff; border-color: #ffffff; transform: scale(1.08) rotate(90deg); }
        
        #zx-loader-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, rgba(10, 13, 26, 0.85) 0%, rgba(4, 5, 10, 0.98) 100%); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); z-index: 9999999; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        #zx-loader-overlay.show-loader { opacity: 1; pointer-events: auto; }
        .zx-refresh-spinner { width: 46px; height: 46px; border: 3px solid rgba(255, 255, 255, 0.05); border-radius: 50%; animation: zx-spin 0.8s linear infinite; margin-bottom: 22px; filter: drop-shadow(0 0 8px currentColor); }
        .zx-popup-box { background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%); border: 1px solid rgba(255, 255, 255, 0.12); padding: 20px 42px; border-radius: 22px; text-align: center; box-shadow: 0 20px 55px rgba(0,0,0,0.85); transform: scale(0.88); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        #zx-loader-overlay.show-loader .zx-popup-box { transform: scale(1); }
        .zx-popup-title { color: rgba(143, 160, 221, 0.8); font-size: 10px; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 6px; font-weight: 800; }
        .zx-popup-game-name { color: #ffffff; font-size: 24px; font-weight: 900; margin: 0; }
        #bg-frame { transition: opacity 0.3s ease; }
    `;
    document.head.appendChild(style);

    const loaderOverlay = document.createElement('div');
    loaderOverlay.id = 'zx-loader-overlay';
    loaderOverlay.innerHTML = `<div class="zx-refresh-spinner" id="zx-spinner-dynamic"></div><div class="zx-popup-box"><p class="zx-popup-title" id="zx-popup-title">Switching Game</p><p class="zx-popup-game-name" id="zx-popup-game-name">GAMES</p></div>`;
    document.body.appendChild(loaderOverlay);

    const menuWrapper = document.createElement('div');
    menuWrapper.id = 'premium-menu-wrapper';

    const switcherContainer = document.createElement('div');
    switcherContainer.id = 'premium-game-switcher';

    const gameButtonsRow = document.createElement('div');
    gameButtonsRow.className = 'game-buttons-row';
    switcherContainer.appendChild(gameButtonsRow);

    function showLivePopup(title, msg, color, duration = 1200) {
        const pTitle = document.getElementById('zx-popup-title');
        const pName = document.getElementById('zx-popup-game-name');
        const pSpinner = document.getElementById('zx-spinner-dynamic');
        pTitle.innerText = title; pName.innerText = msg; pName.style.color = color || "#ffffff"; pSpinner.style.borderLeftColor = color || "#8fa0dd";
        loaderOverlay.classList.add('show-loader');
        return new Promise((resolve) => { setTimeout(() => { resolve(); }, duration); });
    }

    gamesList.forEach((game, index) => {
        const button = document.createElement('button');
        button.className = 'game-tab-btn';
        button.id = 'btn-game-' + index;
        if (index === savedIndex) {
            button.style.background = game.bg; button.style.color = index === 3 ? "#ffd700" : "#ffffff"; if(game.border) button.style.border = game.border; button.classList.add('active-tab');
        }
        button.innerHTML = `<span class="tab-text">${game.name}</span>`;
        button.addEventListener('pointerup', async function(e) {
            if (isMoved) return; if (this.classList.contains('active-tab')) return;
            await showLivePopup("Loading Platform", game.name, game.color, 1200);
            document.querySelectorAll('.game-tab-btn').forEach((btn) => {
                btn.classList.remove('active-tab'); btn.style.background = 'transparent'; btn.style.color = 'rgba(255, 255, 255, 0.7)'; btn.style.border = 'none'; btn.style.boxShadow = 'none';
            });
            this.classList.add('active-tab'); this.style.background = game.bg; this.style.color = index === 3 ? "#ffd700" : "#ffffff"; if(game.border) this.style.border = game.border;
            localStorage.setItem(savedGameIndexKey, index); iframe.src = game.url; iframe.onload = () => { loaderOverlay.classList.remove('show-loader'); };
        });
        gameButtonsRow.appendChild(button);
    });

    const controlsSection = document.createElement('div');
    controlsSection.className = 'controls-section';
    const togglesRow = document.createElement('div');
    togglesRow.className = 'toggles-row';

    const lzrBtn = document.createElement('button'); lzrBtn.className = 'lzr-toggle-btn lzr-off'; lzrBtn.innerHTML = 'LZR 1;';
    const miniLzrBtn = document.createElement('button'); miniLzrBtn.className = 'lzr-toggle-btn lzr-off'; miniLzrBtn.innerHTML = 'MINI LZR';

    togglesRow.appendChild(lzrBtn); togglesRow.appendChild(miniLzrBtn); controlsSection.appendChild(togglesRow);

    const serverContainer = document.createElement('div');
    serverContainer.className = 'server-select-container';
    serverContainer.innerHTML = `<span class="server-label">📡 SERVER:</span><select class="server-dropdown" id="zx-server-select"><option value="server-1">⚡ VIP SERVER 01</option><option value="server-2">⚡ PREMIUM SERVER 02</option><option value="server-3">⚡ ULTRA FAST SERVER 03</option></select>`;
    controlsSection.appendChild(serverContainer); switcherContainer.appendChild(controlsSection);

    // 🌟 পাওয়ার এবং রিয়েল প্রেডিক্টর বোতাম মেমোরি রেফারেন্স ট্র্যাকিং
    let isLzrActive = false;
    const powerBtn = document.getElementById('power-toggle-btn');
    const predictorPanel = document.getElementById('real-predictor');
    
    if (powerBtn) { powerBtn.classList.add('panel-hidden'); powerBtn.style.setProperty('display', 'none', 'important'); }

    // 🌟 নিখুঁত ডাইনামিক পাওয়ার স্টেট ম্যানেজার (উধাও হওয়া রোধ করবে)
    function refreshPowerVisibility() {
        if (!powerBtn) return;
        if (isLzrActive) {
            powerBtn.classList.remove('panel-hidden');
            powerBtn.style.setProperty('display', 'block', 'important');
        } else {
            powerBtn.classList.add('panel-hidden');
            powerBtn.style.setProperty('display', 'none', 'important');
        }
    }

    // LZR 1 ইভেন্ট লজিক
    lzrBtn.addEventListener('click', async function(e) {
        e.stopPropagation();
        if (lzrBtn.classList.contains('lzr-off')) {
            await showLivePopup("System Injecting", "LZR 1 ACTIVE ✅", "#2ed573", 1000);
            lzrBtn.classList.remove('lzr-off'); lzrBtn.classList.add('lzr-on'); lzrBtn.innerHTML = 'LZR 1; ON';
            isLzrActive = true;
        } else {
            await showLivePopup("System Cleaning", "LZR 1 DISABLED ⭕", "#ff4757", 800);
            lzrBtn.classList.remove('lzr-on'); lzrBtn.classList.add('lzr-off'); lzrBtn.innerHTML = 'LZR 1;';
            isLzrActive = false;
        }
        refreshPowerVisibility();
        loaderOverlay.classList.remove('show-loader');
    });

    // 🌟 MutationObserver ইন্টিগ্রেশন: থার্ড-পার্টি স্ক্রিপ্ট বা রিয়েল প্রেডিকশন ওভাররাইড করলেও বাটন জোরপূর্বক আটকে রাখবে
    if (powerBtn) {
        const observer = new MutationObserver(() => {
            if (isLzrActive && powerBtn.classList.contains('panel-hidden')) {
                refreshPowerVisibility();
            }
        });
        observer.observe(powerBtn, { attributes: true, attributeFilter: ['class', 'style'] });
        if (predictorPanel) {
            observer.observe(predictorPanel, { attributes: true });
        }
    }

    miniLzrBtn.addEventListener('click', async function(e) {
        e.stopPropagation();
        if (miniLzrBtn.classList.contains('lzr-off')) {
            await showLivePopup("System Injecting", "MINI LZR ACTIVE ✅", "#2ed573", 1000);
            miniLzrBtn.classList.remove('lzr-off'); miniLzrBtn.classList.add('lzr-on'); miniLzrBtn.innerHTML = 'MINI ON';
        } else {
            await showLivePopup("System Cleaning", "MINI LZR DISABLED ⭕", "#ff4757", 800);
            miniLzrBtn.classList.remove('lzr-on'); miniLzrBtn.classList.add('lzr-off'); miniLzrBtn.innerHTML = 'MINI LZR';
        }
        loaderOverlay.classList.remove('show-loader');
    });

    const serverSelect = serverContainer.querySelector('#zx-server-select');
    serverSelect.addEventListener('mousedown', (e) => e.stopPropagation());
    serverSelect.addEventListener('touchstart', (e) => e.stopPropagation());
    serverSelect.addEventListener('change', async function(e) {
        const text = serverSelect.options[serverSelect.selectedIndex].text;
        await showLivePopup("Routing Network", text, "#ffd700", 1100);
        loaderOverlay.classList.remove('show-loader');
    });

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'menu-toggle-btn'; toggleBtn.innerHTML = '⚙️';
    toggleBtn.addEventListener('click', (e) => e.stopPropagation());

    menuWrapper.appendChild(toggleBtn); menuWrapper.appendChild(switcherContainer); document.body.appendChild(menuWrapper);

        // --- ১০০% সিকিউরড অ্যান্টি-বাগ ড্র্যাগ ইঞ্জিন ---
    let isDragging = false, isMoved = false, offsetX = 0, offsetY = 0, startX = 0, startY = 0;

    function startDrag(e) {
        // প্রটেকশন: গেম ট্যাব বা ভেতরের অন্যান্য কন্ট্রোল বাটনে টাচ করলে ড্র্যাগ শুরু হবে না
        if (e.target === lzrBtn || e.target === miniLzrBtn || e.target === serverSelect || e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') return;
        if (e.target.closest('.game-tab-btn')) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const rect = menuWrapper.getBoundingClientRect();
        
        isDragging = true; 
        isMoved = false;
        startX = clientX; 
        startY = clientY;

        menuWrapper.style.transform = 'none'; 
        menuWrapper.style.left = rect.left + 'px'; 
        menuWrapper.style.top = rect.top + 'px';
        
        offsetX = clientX - rect.left; 
        offsetY = clientY - rect.top;
    }

    function doDrag(e) {
        if (!isDragging) return; 
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        // জেনুইন মুভমেন্ট চেক: আঙুল ৪ পিক্সেলের বেশি নড়লে তবেই ড্র্যাগ কাউন্ট হবে
        if (Math.abs(clientX - startX) > 4 || Math.abs(clientY - startY) > 4) { 
            isMoved = true; 
        }
        
        if (e.cancelable) e.preventDefault();
        
        let newX = clientX - offsetX, newY = clientY - offsetY;
        
        // স্ক্রিন বাউন্ডারি সেফ লক (১০ পিক্সেল প্যাডিং)
        newX = Math.max(10, Math.min(newX, window.innerWidth - menuWrapper.offsetWidth - 10));
        newY = Math.max(10, Math.min(newY, window.innerHeight - menuWrapper.offsetHeight - 10));
        
        menuWrapper.style.left = newX + 'px'; 
        menuWrapper.style.top = newY + 'px';
    }

    function endDrag(e) { 
        if (!isDragging) return;
        isDragging = false; 

        // ফিক্স: যদি আঙুল না নড়ে থাকে এবং টাচটি গিয়ার বোতামের (⚙️) ওপর হয়, তবেই মেনু টগল হবে
        if (!isMoved && (e.target === toggleBtn)) {
            const rectBefore = menuWrapper.getBoundingClientRect();
            switcherContainer.classList.toggle('hidden-bar');
            toggleBtn.innerHTML = switcherContainer.classList.contains('hidden-bar') ? '🎮' : '⚙️';
            
            requestAnimationFrame(() => {
                const rectAfter = menuWrapper.getBoundingClientRect();
                if (rectBefore.left > window.innerWidth / 2) { 
                    menuWrapper.style.left = (rectBefore.right - rectAfter.width) + 'px'; 
                } else { 
                    menuWrapper.style.left = rectBefore.left + 'px'; 
                }
                adjustBoundary();
            });
        } else {
            adjustBoundary();
        }
        isMoved = false;
    }

    function adjustBoundary() {
        const rect = menuWrapper.getBoundingClientRect(); 
        let currentX = rect.left, currentY = rect.top;
        
        if (currentX + menuWrapper.offsetWidth > window.innerWidth) currentX = window.innerWidth - menuWrapper.offsetWidth - 10;
        if (currentX < 10) currentX = 10;
        if (currentY + menuWrapper.offsetHeight > window.innerHeight) currentY = window.innerHeight - menuWrapper.offsetHeight - 10;
        if (currentY < 10) currentY = 10;
        
        menuWrapper.style.left = currentX + 'px'; 
        menuWrapper.style.top = currentY + 'px';
    }

    // ড্র্যাগ ইভেন্ট লিসেনারস
    menuWrapper.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', endDrag);

    menuWrapper.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', endDrag);

    window.addEventListener('resize', adjustBoundary);

    // প্রথমবার লোডের অটো-পজিশন রেন্ডারার
    requestAnimationFrame(() => {
        const rect = menuWrapper.getBoundingClientRect();
        menuWrapper.style.left = ((window.innerWidth - rect.width) / 2) + 'px';
        menuWrapper.style.top = (window.innerHeight * 0.4) + 'px';
        adjustBoundary();
    });
})();





    // --- ZX TRADER HACK এর মূল কোড অংশ ---
    try {
        const predictor = document.createElement('div');
        predictor.id = 'real-predictor';

        const lockScreen = document.createElement('div');
        lockScreen.className = 'lock-screen';
        lockScreen.id = 'lockScreen';

        const secureTxt = document.createElement('p');
        secureTxt.style.cssText = 'color: #8fa0dd; font-size: 11px; letter-spacing: 1px; margin: 0; opacity: 0.7; text-transform: uppercase; text-align: center; margin-top: 20px;';
        secureTxt.innerText = ' ';

        const lockTitle = document.createElement('div');
        lockTitle.className = 'title';
        lockTitle.innerText = 'ZX TRADER HACK';

        const passInput = document.createElement('input');
        passInput.type = 'password';
        passInput.id = 'passInput';
        passInput.className = 'lock-input';
        passInput.placeholder = 'Password';

        const lockBtn = document.createElement('button');
        lockBtn.className = 'lock-btn';
        lockBtn.innerText = 'Unlock';
        lockBtn.addEventListener('click', function() {
            if (typeof checkPassword === 'function') { checkPassword(); }
        });

        lockScreen.appendChild(secureTxt);
        lockScreen.appendChild(lockTitle);
        lockScreen.appendChild(passInput);
        lockScreen.appendChild(lockBtn);
        predictor.appendChild(lockScreen);

        const header = document.createElement('div');
        header.className = 'header';

        const headerTitle = document.createElement('div');
        headerTitle.className = 'title';
        headerTitle.innerText = 'WINGO 30 sc';

        const liveTag = document.createElement('div');
        liveTag.className = 'live-tag';
        const pulseDot = document.createElement('div');
        pulseDot.className = 'pulse-dot';
        const liveSpan = document.createElement('span');
        liveSpan.innerText = 'Live Data';

        liveTag.appendChild(pulseDot);
        liveTag.appendChild(liveSpan);
        header.appendChild(headerTitle);
        header.appendChild(liveTag);
        predictor.appendChild(header);

        const body = document.createElement('div');
        body.className = 'body';

        const zxTitle = document.createElement('div');
        zxTitle.className = 'zx-title';
        zxTitle.innerText = 'ZX TRADER HACK';

        const periodInfo = document.createElement('div');
        periodInfo.className = 'period-info';
        periodInfo.innerHTML = 'PERIOD:<span id="period-num"></span>';

        const numContainer = document.createElement('div');
        numContainer.className = 'number-container';

        const signalTxt = document.createElement('div');
        signalTxt.className = 'signal-number';
        signalTxt.id = 'signal-txt';

        const loaderBox = document.createElement('div');
        loaderBox.id = 'loader-box';
        loaderBox.className = 'loader-box';
        
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        
        const loaderText = document.createElement('div');
        loaderText.className = 'loader-text';
        loaderText.innerText = 'ANALYZING';

        loaderBox.appendChild(spinner);
        loaderBox.appendChild(loaderText);
        numContainer.appendChild(signalTxt);
        numContainer.appendChild(loaderBox);

        const footer = document.createElement('div');
        footer.className = 'footer';

        const timerRow = document.createElement('div');
        timerRow.className = 'timer-row';
        
        const nextSignal = document.createElement('span');
        nextSignal.innerText = 'NEXT : ';
        
        const timerTxt = document.createElement('span');
        timerTxt.className = 'time-box';
        timerTxt.id = 'timer-txt';
        timerTxt.innerText = '00:00';

        timerRow.appendChild(nextSignal);
        timerRow.appendChild(timerTxt);

        const barBg = document.createElement('div');
        barBg.className = 'bar-bg';
        
        const progressFill = document.createElement('div');
        progressFill.className = 'bar-fill';
        progressFill.id = 'progress-fill';

        barBg.appendChild(progressFill);
        footer.appendChild(timerRow);
        footer.appendChild(barBg);

        body.appendChild(zxTitle);
        body.appendChild(periodInfo);
        body.appendChild(numContainer);
        body.appendChild(footer);
        predictor.appendChild(body);

        document.body.appendChild(predictor);
        
    } catch (err) {
        console.log("ডোমেইন সুরক্ষা সতর্কতা হ্যান্ডেল করা হয়েছে:", err.message);
    }


// রি-ডিক্লেয়ারেশন এরর এড়াতে নিরাপদ ভ্যারিয়েবল অ্যাসাইনমেন্ট লজিক
try {
    signalTxt = document.getElementById("signal-txt");
    periodNum = document.getElementById("period-num");       
    timerTxt = document.getElementById("timer-txt");         
    progressFill = document.getElementById("progress-fill"); 
    loaderBox = document.getElementById("loader-box");   

    currentPeriod = "";
    previousPrediction = null;
} catch (e) {
    window.signalTxt = document.getElementById("signal-txt");
    window.periodNum = document.getElementById("period-num");       
    window.timerTxt = document.getElementById("timer-txt");         
    window.progressFill = document.getElementById("progress-fill"); 
    window.loaderBox = document.getElementById("loader-box");   

    window.currentPeriod = "";
    window.previousPrediction = null;
}


let martingaleLevel = Number(sessionStorage.getItem("martingaleLevel")) || 1; 



let totalGames = Number(sessionStorage.getItem("totalGames")) || 0;

let winCount = Number(sessionStorage.getItem("winCount")) || 0;

let lossCount = Number(sessionStorage.getItem("lossCount")) || 0;



// =================================================================

// ১. আপনার দেওয়া আসল UI ফাংশন (লজিক ও স্টাইল অক্ষত রেখে সিওর শট যুক্ত)

// =================================================================

function updateStatsUI() {

    let statsDiv = document.getElementById("prediction-stats");

    

    if (!statsDiv) {

        statsDiv = document.createElement("div");

        statsDiv.id = "prediction-stats";

        

        statsDiv.style.cssText = `

            margin-top: -97%; 

            margin-left: -20px;

            font-size: 7.5px; 

            font-family: sans-serif; 

            font-weight: 900; 

            text-align: center; 

            position: absolute;       

            display: flex; 

            justify-content: center; 

            gap: 7px; 

            align-items: center;

            color: rgba(255, 255, 255, 0.6);

            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);

            text-transform: uppercase;

            width: 120%;

            background: rgba(0, 0, 0, 0.3);

            padding: 4px 15px;

            

            /* চারদিকের বর্ডার বাদ দিয়ে শুধুমাত্র নিচের দিকে সিঙ্গেল বর্ডার */

            border-bottom: 0.20px solid rgba(255, 255, 255, 0.2);

        `;

        

        if (typeof signalTxt !== 'undefined' && signalTxt && signalTxt.parentNode && signalTxt.parentNode.parentNode) {

            signalTxt.parentNode.parentNode.appendChild(statsDiv);

        }

    }



    const winRate = totalGames > 0 ? Math.round((winCount / totalGames) * 100) : 0;



    // সিনট্যাক্স এরর ফিক্সড এবং স্ল্যাশ (/) গুলো আপনার কোড অনুযায়ী বাদ দেওয়া হয়েছে

    statsDiv.innerHTML = `

        <span style="color: #10B981;">Win: ${winCount}</span>

        <span style="color: rgba(255,255,255,0.2); margin: 0 4px;"></span> 

        <span style="color: #EF4444;">Los: ${lossCount}</span>

        <span style="color: rgba(255,255,255,0.2); margin: 0 4px;"></span> 

        <span style="color: #F59E0B; font-weight: bold;">ACC: ${winRate}%</span>

        <span id="ui-sure-shot-text" style="margin-left: 6px; font-weight: bold; transition: all 0.3s;"></span>

    `;

}





// Safely declare without crashing if it already exists

if (typeof window.lastPredictionResult === 'undefined') {

    window.lastPredictionResult = null;

}



// Safely declare without crashing if it already exists

if (typeof window.lastPredictionResult === 'undefined') {

    window.lastPredictionResult = null;

}

// ============================================================================

// PART 1 - SECTION A: HEADER & SPECIFIED MODE/PATTERN GRID MATRIX

// ============================================================================

(function injectTradingDashboard() {

    if (document.getElementById('trading-ui-card')) return;

    const ui = document.createElement('div');

    ui.innerHTML = `

    <div id="trading-ui-card" style="position:fixed;top:15px;right:15px;z-index:9999999;background:rgba(5,7,12,0.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#e2e8f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:12px;border-radius:14px;width:235px;border:1px solid rgba(255, 255, 255, 0.25);box-shadow:0 8px 24px rgba(0,0,0,0.7);text-align:center;box-sizing:border-box;touch-action:none;cursor:grab;transition:all 0.25s ease;display:none;opacity:0;transform:scale(0.85);">



                               

        <button id="ui-hide-btn" style="position:absolute; top:8px; right:10px; background:#030712; border:1.5px solid #3b82f6; width:30px; height:30px; border-radius:50%; display:flex; justify-content:center; align-items:center; cursor:pointer; padding:0; box-sizing:border-box; z-index:100000; animation: neonPulse 2s infinite ease-in-out; transition: all 0.25s ease; will-change: transform, box-shadow;">

            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" style="filter:drop-shadow(0 0 3px #3b82f6); overflow:visible; transition:all 0.2s ease;">

                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>

                <line x1="12" y1="2" x2="12" y2="12"></line>

            </svg>

        </button>

        <style>

            @keyframes neonPulse {

                0% {

                    box-shadow: 0 0 6px #1e40af, inset 0 0 3px #1e40af;

                    border-color: #2563eb;

                }

                50% {

                    box-shadow: 0 0 14px #3b82f6, inset 0 0 7px #3b82f6;

                    border-color: #60a5fa;

                }

                100% {

                    box-shadow: 0 0 6px #1e40af, inset 0 0 3px #1e40af;

                    border-color: #2563eb;

                }

            }

            

            /* মাউস হোভার করলে অ্যানিমেশন পজ (Pause) হয়ে ব্রাইটনেস আরও বেড়ে যাবে */

            #ui-hide-btn:hover {

                animation-play-state: paused;

                transform: scale(1.1);

                box-shadow: 0 0 18px #60a5fa, inset 0 0 9px #60a5fa !important;

                border-color: #93c5fd !important;

            }

            #ui-hide-btn:hover svg {

                filter: drop-shadow(0 0 6px #ffffff) !important;

                stroke: #93c5fd !important;

            }

        </style>





<!-- ================================================================= -->

<!--  ALPHA-DOMINATOR ACCURACY ENGINE - PART 3/4 (HUD PANEL DESIGN)    -->

<!--  THROUGHPUT: ULTRA-COMPACT FUTURISTIC MATRIX DISPLAY WINNER       -->

<!-- ================================================================= -->



<!-- 🎨 CSS Embedded Animation Style -->

<style>

@keyframes scan-light {

    0% { left: -100%; }

    100% { left: 150%; }

}

</style>



<!-- Header Title -->

<div style="font-size:10px; font-weight:900; letter-spacing:1.5px; color:#ffffff; text-shadow:0 0 5px rgba(255,255,255,0.3); margin-top:2px; margin-bottom:8px; text-transform:uppercase; font-family:'Segoe UI',Roboto,sans-serif; pointer-events:none;">

    AI ACTION <span style="color:#00f2ff; text-shadow:0 0 8px rgba(0,242,255,0.6);">MONITOR</span>

</div>

             

<!-- High-Tech Neon Laser Separator -->

<div style="position:relative; height:1px; background:linear-gradient(90deg, transparent, rgba(0,242,255,0.3), transparent); margin:5px 0 8px 0; overflow:hidden; pointer-events:none;">

    <div style="position:absolute; top:0; left:-100%; width:60px; height:100%; background:linear-gradient(90deg, transparent, #00f2ff, #ffffff, #00f2ff, transparent); animation:scan-light 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;"></div>

</div>



<!-- ─── LINE 1: 1-MODE & 2-PATTERN ─── -->

<div style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:6px; font-size:8px; pointer-events:none; font-family:'Segoe UI',Roboto,sans-serif;">

    <!-- 1. Premium Mode Box -->

    <div style="background:linear-gradient(135deg, #030a1c 0%, #01030a 100%); height: 26px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius:6px; border:1px solid rgba(0, 242, 255, 0.2); box-shadow:0 0 8px rgba(0,242,255,0.03);">

        <span style="color:rgba(0, 242, 255, 0.5); font-weight:800; font-size:6.5px; letter-spacing:0.5px; text-transform:uppercase; line-height: 1;">MODE</span>

        <span id="ui-market-mode" style="color:#00f2ff; font-weight:900; font-size:8.5px; letter-spacing:0.3px; font-family:ui-monospace,monospace; text-shadow:0 0 6px rgba(0, 242, 255, 0.5); line-height: 1.2;">NORMAL</span>

    </div>

    

    <!-- 2. Premium Pattern Box -->

    <div style="background:linear-gradient(135deg, #09031c 0%, #03010a 100%); height: 26px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius:6px; border:1px solid rgba(167,139,250,0.2); box-shadow:0 0 8px rgba(167,139,250,0.03);">

        <span style="color:rgba(167, 139, 250, 0.5); font-weight:800; font-size:6.5px; letter-spacing:0.5px; text-transform:uppercase; line-height: 1;">PATTERN</span>

        <span id="ui-pattern-mode" style="color:#b59ffb; font-weight:900; font-size:8.5px; letter-spacing:0.3px; font-family:ui-monospace,monospace; text-shadow:0 0 6px rgba(167, 139, 250, 0.5); line-height: 1.2;">WAITING</span>

    </div>

</div>



<!-- ─── LINE 2: 3-BET NOW, 4-ACC, 5-TOTAL PROFIT ─── -->

<div style="display:grid; grid-template-columns: 1fr 1.1fr 1fr; gap:5px; margin-bottom:6px; pointer-events:none; font-family:'Segoe UI',Roboto,sans-serif;">

    <!-- 3. Suggested Bet (Gold Theme) -->

    <div style="background: linear-gradient(135deg, #120f02, #000000); height: 26px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 6px; border: 1px solid rgba(212, 175, 55, 0.2); padding: 0 2px;">

        <span style="color: rgba(212, 175, 55, 0.5); font-size: 6px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; line-height: 1;">BET NOW</span>

        <span style="color: #ffe073; font-weight: 900; font-size: 8.5px; font-family: ui-monospace, monospace; text-shadow: 0 0 6px rgba(212, 175, 55, 0.3); line-height: 1.2;">৳<span id="ui-bet-amount">0</span></span>

    </div>



    <!-- 4. Accuracy Part (Matrix Green) -->

    <div style="background: linear-gradient(135deg, #02140a, #000000); height: 26px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 6px; border: 1px solid rgba(0, 255, 170, 0.18); padding: 0 2px;">

        <span style="color: rgba(0, 255, 170, 0.5); font-size: 6px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; line-height: 1;">confidence </span>

        <span id="ui-percentage" style="color: #ffffff; font-weight: 900; font-size: 8.5px; font-family: ui-monospace, monospace; text-shadow: 0 0 6px rgba(0, 255, 170, 0.5); line-height: 1.2;">0%</span>

    </div>

    

    <!-- 5. Total Net Profit Counter (Neon Green Theme) -->

    <div style="background: linear-gradient(135deg, #02140a, #000000); height: 26px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 6px; border: 1px solid rgba(0, 255, 170, 0.15); padding: 0 2px;">

        <span style="color: rgba(0, 255, 170, 0.4); font-size: 6px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; line-height: 1;">PROFIT</span>

        <span id="ui-total-profit" style="color: #00ffaa; font-weight: 900; font-size: 8.5px; font-family: ui-monospace, monospace; text-shadow: 0 0 6px rgba(0, 255, 170, 0.3); line-height: 1.2;">৳0.00</span>

    </div>

</div>



<!-- ─── LINE 3: 6-WAITING (Locked Pure Black Background) ─── -->

<div style="display: flex; justify-content: center; margin: 0 auto 4px auto; max-width: 90px; pointer-events: none; font-family: 'Segoe UI', Roboto, sans-serif; width: 100%;">

    <!-- 6. Decision Value (Strictly Locked Background) -->

    <span id="ui-decision-value" style="color: #ff2a5f; font-weight: 950; font-size: 10px; letter-spacing: 0.5px; background: #000000 !important; height: 26px; display: inline-flex; align-items: center; justify-content: center; padding: 0 8px; border-radius: 6px; border: 0.5px solid rgba(255, 42, 95, 0.2); text-transform: uppercase; font-family: ui-monospace, monospace; width: 100%; box-sizing: border-box; text-shadow: 0 0 10px rgba(255, 42, 95, 0.8); text-align: center;">

        WAITING

    </span>

</div>









<!-- Divider Line -->

<div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent); margin: 6px 0; pointer-events: none;"></div>





        <!-- History Container (Advanced Sci-Fi Glass Interface) -->

        <div style="text-align:center; background:linear-gradient(180deg, #020617 0%, #000000 100%); padding:8px; border-radius:12px; border:1px solid rgba(59,130,246,0.25); box-shadow:0 0 15px rgba(59,130,246,0.1), inset 0 0 10px rgba(59,130,246,0.05); position:relative; overflow:hidden;">

            

            <!-- Header Command Bar with Non-Breaking Absolute Centering -->

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; padding:0 2px; position:relative; width:100%; height:24px; box-sizing:border-box;">

                <!-- Highly Visible Live Real-Time Clock Display -->

                <div id="ui-live-clock" style="color:#00e5ff; font-family:monospace; font-size:7px; font-weight:900; text-align:left; white-space:nowrap; pointer-events:none; text-shadow:0 0 3px rgba(255,255,255,0.3); z-index:2; width:62px;">00:00:00 AM</div>

                

                <!-- Flawless Centered Title (Guaranteed to Never Break or Wrap) -->

                <span style="color:#ffffff; font-size:10px; font-weight:900; letter-spacing:1px; text-shadow:0 0 8px rgba(255,255,255,0.5); font-family:system-ui, sans-serif; pointer-events:none; position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); white-space:nowrap; z-index:1; text-align:center;">❖ HISTORY ❖</span>

                

                                <!-- Premium Tactical Refresh Button (Cyber Orange Glow) -->

                <button id="ui-clear-btn" style="background:rgba(249,115,22,0.12); border:1px solid #f97316; width:22px; height:22px; border-radius:50%; display:flex; justify-content:center; align-items:center; cursor:pointer; padding:0; box-shadow:0 0 8px rgba(249,115,22,0.3); transition:all 0.2s; box-sizing:border-box; z-index:2; margin-left:auto; will-change:transform, box-shadow;"

                onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 0 14px #f97316, inset 0 0 5px #f97316';" 

                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 8px rgba(249,115,22,0.3), inset 0 0 0px transparent';">

                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fdba74" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 3px rgba(249,115,22,0.6)); transition: all 0.2s;">

                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>

                    </svg>

                </button>

            </div>



                

            <!-- Glowing Data Flow Separator Bar -->

            <div style="height:1px; background:linear-gradient(90deg, transparent 0%, #1e40af 20%, #3b82f6 50%, #1e40af 80%, transparent 100%); margin-bottom:6px; opacity:0.7; pointer-events:none;"></div>

            

            <!-- Table Headers Grid (Perfect 5-Column Alignment Shield with Vertical Borders) -->

            <div style="display:grid; grid-template-columns:0.9fr 1fr 0.6fr 0.6fr 1.2fr; font-size:7px; font-weight:900; text-align:center; border-bottom:1px solid rgba(59,130,246,0.25); padding-bottom:3px; margin-bottom:4px; letter-spacing:0.5px; font-family:monospace; align-items:center; pointer-events:none;">

                <div style="color:#FFFFFF; border-right:1px solid rgba(59,130,246,0.3); padding-right:2px;">PERIOD</div>

                <div style="color:#FFFFFF; border-right:1px solid rgba(59,130,246,0.3); padding-left:2px; padding-right:2px;">RESULT</div>

                <div style="color:#FFFFFF; border-right:1px solid rgba(59,130,246,0.3); padding-left:2px; padding-right:2px;">STEP</div>

                <div style="color:#FFFFFF; border-right:1px solid rgba(59,130,246,0.3); padding-left:2px; padding-right:2px;">ACC</div>

                <div style="color:#FFFFFF; padding-left:2px;">WIN-LOSS</div>

            </div>

            

            <!-- Scrollable Tactical Log Viewport -->

            <div id="ui-history-log" style="max-height:95px; overflow-y:auto; display:flex; flex-direction:column; gap:3px; padding-right:2px; background:transparent;">

                <div id="ui-empty-msg" style="font-size:7.5px; color:#1e3a8a; text-align:center; padding:4px; font-family:monospace; font-weight:bold; letter-spacing:1px; background:rgba(30,58,138,0.05); border-radius:6px; border:1px dashed rgba(30,58,138,0.2);">📡 LIVE HISTORY DATA IDLE</div>

            </div>

        </div>

    </div>

    

    <style>

        @keyframes spin { 100% { transform:rotate(360deg); } }

        @keyframes scan-light { 0% { left:-50px; } 100% { left:100%; } }

        #ui-history-log::-webkit-scrollbar { width:2px; }

        #ui-history-log::-webkit-scrollbar-thumb { background:rgba(59,130,246,0.15); border-radius:2px; }

    </style>`;

    

    document.body ? document.body.appendChild(ui) : document.addEventListener('DOMContentLoaded', () => document.body.appendChild(ui));

    

    // Clear Event Handler Logic

    setTimeout(() => {

        const btn = document.getElementById('ui-clear-btn');

        if (btn) btn.addEventListener('click', (e) => {

            e.stopPropagation(); // Prevents clicking button from triggering card drag event

            sessionStorage.clear(); localStorage.clear();

            window.uiLastHistoryKey = ""; 

            const log = document.getElementById('ui-history-log');

            if (log) log.innerHTML = '<div id="ui-empty-msg" style="font-size:7.5px; color:#1e3a8a; text-align:center; padding:8px; font-family:monospace; font-weight:bold; letter-spacing:1px; background:rgba(30,58,138,0.05); border-radius:6px; border:1px dashed rgba(30,58,138,0.2);">📡 LIVE HISTORY DATA IDLE</div>';

        });

    }, 500);



        // ============================================================================

    // 100% WORKING DRAGGING ENGINE WITH ZERO LAG & SOLID BOUNDARY LOCK

    // ============================================================================

        setTimeout(() => {

        const card = document.getElementById('trading-ui-card');

        if (!card) return;



        let isDragging = false;

        let startX = 0, startY = 0;

        let currentX = 0, currentY = 0; // বর্তমান পজিশন ট্র্যাক করার জন্য

        let maxX = 0, maxY = 0; // সাইজ লক ভেরিয়েবল



        function startDrag(e) {

            // বাটন বা হিস্ট্রি লিস্ট স্ক্রোল করার সময় ড্রাগিং বন্ধ থাকবে (হাইড বাটন ও শো বাটনও সেফ রাখা হলো)

            if (e.target.closest('#ui-clear-btn') || e.target.closest('#ui-history-log') || e.target.closest('#ui-hide-btn') || e.target.closest('#trading-ui-show-btn')) return;

            

            isDragging = true;

            card.style.cursor = 'grabbing';

            card.style.transition = 'none'; // ড্র্যাগ করার সময় স্মুথ অ্যানিমেশন অফ রাখা আবশ্যক যাতে ল্যাগ না হয়

            

            const point = e.type.includes('touch') ? e.touches[0] : e;

            startX = point.clientX - currentX;

            startY = point.clientY - currentY;

            

            // স্ক্রিনের বাউন্ডারি লিমিট একবারই হিসাব করে নেওয়া হলো, যাতে নড়ার সময় ল্যাগ না করে

            maxX = window.innerWidth - card.offsetWidth;

            maxY = window.innerHeight - card.offsetHeight;

            

            // ইনিশিয়াল পজিশন ফিক্সড করা (রাইট সাইড রিমুভ)

            const rect = card.getBoundingClientRect();

            if (card.style.right !== 'auto') {

                card.style.right = 'auto';

                card.style.left = rect.left + 'px';

                card.style.top = rect.top + 'px';

                startX = point.clientX;

                startY = point.clientY;

                currentX = 0;

                currentY = 0;

            }

            

            if (e.type === 'mousedown') e.preventDefault();

        }



        function doDrag(e) {

            if (!isDragging) return;

            

            const point = e.type.includes('touch') ? e.touches[0] : e;

            

            // নতুন পজিশন হিসাব

            let x = point.clientX - startX;

            let y = point.clientY - startY;

            

            // মেইন কার্ডের আসল কোঅর্ডিনেট বের করা বাউন্ডারি লকের জন্য

            const rect = card.getBoundingClientRect();

            const originalLeft = rect.left - currentX;

            const originalTop = rect.top - currentY;

            

            // স্ক্রিনের চারদিকের বডি বাউন্ডারি লক লজিক

            if (originalLeft + x < 0) x = -originalLeft;

            if (originalLeft + x > maxX) x = maxX - originalLeft;

            if (originalTop + y < 0) y = -originalTop;

            if (originalTop + y > maxY) y = maxY - originalTop;

            

            currentX = x;

            currentY = y;

            

            // [GPU ACCELERATION]: style.left/top এর বদলে translate3d ব্যবহার করায় গ্রাফিক্স কার্ড দিয়ে স্মুথলি ড্র্যাগ হবে

            card.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        }



        function endDrag() {

            if (!isDragging) return;

            isDragging = false;

            card.style.cursor = 'grab';

            card.style.transition = 'all 0.25s ease'; // ড্র্যাগ শেষ হলে হাইড/শো এর জন্য আবার অ্যানিমেশন অন করে দেওয়া হলো

        }



        // ডেস্কটপ মাউস ইভেন্ট লিসেনার

        card.addEventListener('mousedown', startDrag);

        document.addEventListener('mousemove', doDrag);

        document.addEventListener('mouseup', endDrag);



        // মোবাইল ও ট্যাবলেট টাচ ইভেন্ট লিসেনার

        card.addEventListener('touchstart', startDrag, { passive: false });

        document.addEventListener('touchmove', doDrag, { passive: true });

        document.addEventListener('touchend', endDrag);

    }, 600);

})();





// =================================================================

//  ⚡ PART 4: INTERFACE CONTROLLER & NET-PROFIT ENGINE - PART A/2

//  THEME: ULTRA-PREMIUM MATRIX PIVOT DESIGN (ZERO ERROR EDITION)

// =================================================================

if (typeof window.botTotalProfitTracker === 'undefined') {

    window.botTotalProfitTracker = 0.00; // গ্লোবাল সেশন প্রফিট মেমোরি শুরু

}



function updateSureShotUI(predictionResult) {

    if (!predictionResult) return;

    window.lastPredictionResult = predictionResult;



    // অবজেক্ট ভ্যালু সিঙ্ক করা (Fallback Mechanism)

    let currentVal = (predictionResult.value || predictionResult.decisionValue || predictionResult.val || '').toUpperCase().trim();



    // ----------------================================================-

    //  PART A: ORIGINAL SITE CONTAINER POSITIONING (.number-container)

    // --------------------------------================================-

    const container = document.querySelector(".number-container");

    if (container) {

        let sureShotDiv = container.querySelector('#ui-sure-shot-text');

        if (!sureShotDiv) {

            sureShotDiv = document.createElement("div");

            sureShotDiv.id = 'ui-sure-shot-text';

            sureShotDiv.style.cssText = "position:absolute;bottom:42px;left:49%;transform:translateX(-50%);font-size:8px;font-family:sans-serif;font-weight:900;text-align:center;text-transform:uppercase;white-space:nowrap;z-index:9999;text-shadow:1px 1px 2px rgba(0,0,0,0.8);";

            container.appendChild(sureShotDiv);

        }

        if (predictionResult.type === "skip" || predictionResult.isSureShot !== true) {

            sureShotDiv.innerText = ""; 

        } else {

            const accuracy = predictionResult.percentage ? predictionResult.percentage : 80;

            sureShotDiv.innerText = `SURE SHOT ${accuracy}%`; 

            sureShotDiv.style.color = "#FFFFFF";

        }

    }



    // ----------------================================================-

    //  PART B: INTERFACE ASSIGNMENT FOR MONITOR PANEL & DYNAMIC COLORS

    // -----------------------------------------------------------------

    const mMode = document.getElementById('ui-market-mode');

    const pMode = document.getElementById('ui-pattern-mode');

    const lvl = document.getElementById('ui-level');

    const pct = document.getElementById('ui-percentage');

    const bdgIcon = document.getElementById('ui-sureshot-icon');

    const uiValDisplay = document.getElementById('ui-decision-value');



    if (mMode) mMode.innerText = predictionResult.marketMode || 'TREND';

    if (pMode) pMode.innerText = predictionResult.patternMode || 'PRICE';

    if (lvl) lvl.innerText = predictionResult.targetLevel ?? 1;

    if (pct) pct.innerText = `${predictionResult.percentage || 0}%`;



    if (bdgIcon) {

        bdgIcon.innerText = predictionResult.isSureShot ? "✅" : "⚠️";

    }



    // মেইন মনিটরে ভ্যালু এবং সেটির আল্ট্রা-প্রিমিয়াম নিয়ন কালার কন্ডিশন সেট করা

    if (uiValDisplay) {

        uiValDisplay.innerText = currentVal || 'WAITING';

        

        if (currentVal === "BIG" || currentVal === "BIGG") {

    uiValDisplay.style.color = "#ff9800"; // Luxury Gold

    uiValDisplay.style.border = "0.5px solid rgba(255, 152, 0, 0.3)";

    uiValDisplay.style.background = "#000000";

    uiValDisplay.style.textShadow = "0 0 10px rgba(255, 152, 0, 0.6)";

} else if (currentVal === "SMALL") {

    uiValDisplay.style.color = "#2196f3"; // Cyber Blue

    uiValDisplay.style.border = "0.5px solid rgba(33, 150, 243, 0.3)";

    uiValDisplay.style.background = "#000000";

    uiValDisplay.style.textShadow = "0 0 10px rgba(33, 150, 243, 0.6)";

} else if (currentVal === "GREEN") {

    uiValDisplay.style.color = "#4caf50"; // Vivid Green

    uiValDisplay.style.border = "0.5px solid rgba(76, 175, 80, 0.3)";

    uiValDisplay.style.background = "#000000";

    uiValDisplay.style.textShadow = "0 0 10px rgba(76, 175, 80, 0.6)";

} else if (currentVal === "RED" || currentVal === "REED") {

    uiValDisplay.style.color = "#f44336"; // Pure Red

    uiValDisplay.style.border = "0.5px solid rgba(244, 67, 54, 0.3)";

    uiValDisplay.style.background = "#000000";

    uiValDisplay.style.textShadow = "0 0 10px rgba(244, 67, 54, 0.6)";

} else {

    uiValDisplay.style.color = "#cbd5e1"; // Neutral Gray

    uiValDisplay.style.border = "0.5px solid rgba(255, 255, 255, 0.1)";

    uiValDisplay.style.background = "#000000";

    uiValDisplay.style.textShadow = "none";

}

}



    // 💰 লস রিকভারি চেইন প্রোটেকশন (স্কিপ মোড আসলেও টাকার পরিমাণ স্ক্রিনে সচল রাখবে)

    const uiBetDisplay = document.getElementById('ui-bet-amount');

    if (uiBetDisplay) {

        uiBetDisplay.innerText = predictionResult.suggestedBet ?? 0;

    }

    // ----------------================================================-

    //  PART C: HISTORY LOGGING & REAL-TIME NET PROFIT CALCULATOR ENGINE

    // -----------------------------------------------------------------

    const historyLog = document.getElementById('ui-history-log');

    if (historyLog) {

        const rawStatus = (predictionResult.status || predictionResult.result || predictionResult.outcome || '').toLowerCase();

        

        // উইন অথবা লস না আসা পর্যন্ত হিস্ট্রি টেবিলে ডাটা পুশ বন্ধ রাখা

        if (!rawStatus.includes('win') && !rawStatus.includes('los')) {

            return;

        }

        

        if (!currentVal) {

            currentVal = "N/A";

        }



        // ডাবল এন্ট্রি বা একই রো বারবার প্রিন্ট হওয়া লকআউট করা

        const currentKey = `${currentVal}_${predictionResult.percentage || 0}_${predictionResult.targetLevel ?? 1}_${rawStatus}`;

        if (window.uiLastHistoryKey === currentKey) {

            return; 

        }

        window.uiLastHistoryKey = currentKey; 



        const emptyMsg = document.getElementById('ui-empty-msg');

        if (emptyMsg) emptyMsg.remove();



        // পিরিয়ড স্লট জেনারেটর (Wingo 30s Rules)

        const now = new Date();

        const startTime = new Date(now).setHours(6, 0, 0, 0);

        const baseTime = (now < startTime) ? startTime - 86400000 : startTime;

        

        let slot = Math.floor((now - baseTime) / 30000); 

        if (slot <= 0) slot = 2880;

        

        const timeStr = slot.toString().padStart(5, '0');

        const accuracyText = predictionResult.percentage ? `${predictionResult.percentage}%` : '80%';

        const stepLevelText = `L${predictionResult.targetLevel ?? 1}`;



        let displayVal = currentVal;

        if (displayVal === "BIG") displayVal = "BIGG";

        else if (displayVal === "RED") displayVal = "REED";



        let valColor = "#cbd5e1";

        let valGlow = "rgba(255,255,255,0)";

        

        if (currentVal === "BIG" || currentVal === "BIGG") {

            valColor = "#ff9800";

            valGlow = "rgba(255, 152, 0, 0.3)";

        } else if (currentVal === "SMALL") {

            valColor = "#2196f3";

            valGlow = "rgba(0, 176, 255, 0.3)";

        } else if (currentVal === "GREEN") {

            valColor = "#4caf50";

            valGlow = "rgba(0, 230, 118, 0.3)";

        } else if (currentVal === "RED" || currentVal === "REED") {

            valColor = "#f44336";

            valGlow = "rgba(255, 23, 68, 0.3)";

        }



        // 🚨 গাণিতিক নেট প্রফিট ক্যালকুলেটর (উইন হলে ১.৯২X প্লাস, লস হলে মাইনাস)

        const activeBetSize = Number(predictionResult.suggestedBet || window.uiLastLoggedBetSize || 10);

        if (window.uiLastLoggedKeyForProfit !== currentKey) {

            window.uiLastLoggedKeyForProfit = currentKey;

            window.uiLastLoggedBetSize = activeBetSize;



            if (rawStatus.includes('win')) {

                window.botTotalProfitTracker += (activeBetSize * 0.92);

            } else if (rawStatus.includes('los')) {

                window.botTotalProfitTracker -= activeBetSize;

            }

        }



        // ড্যাশবোর্ডে মোট লাভের পরিমাণ রেন্ডার করা

        const uiProfitDisplay = document.getElementById('ui-total-profit');

        if (uiProfitDisplay) {

            uiProfitDisplay.innerText = "৳ " + window.botTotalProfitTracker.toFixed(2);

            if (window.botTotalProfitTracker >= 0) {

                uiProfitDisplay.style.color = "#10b981"; // লাভ জোন (Neon Green)

                uiProfitDisplay.style.textShadow = "0 0 8px rgba(16,185,129,0.5)";

            } else {

                uiProfitDisplay.style.color = "#f43f5e"; // লস জোন (Neon Red)

                uiProfitDisplay.style.textShadow = "0 0 8px rgba(244,63,94,0.5)";

            }

        }



        // ২ পিক্সেল লস অফসেট সহ প্রিমিয়াম আউটকাম টেক্সট ডিজাইন

        let outcomeContent = '';

        if (rawStatus.includes('win')) {

            outcomeContent = `

                <span style="color:#4caf50; font-weight:900; text-shadow:0 0 4px rgba(0, 230, 118, 0.3); font-size:7.5px; position:absolute; left:50%; transform:translateX(-50%);">WIN</span>

                <span style="font-size:7.5px; position:absolute; right:6px;">💥</span>

            `;

        } else {

            outcomeContent = `

                <span style="color:#f44336; font-weight:900; text-shadow:0 0 4px rgba(255, 23, 68, 0.3); font-size:7.5px; position:absolute; left:50%; transform:translateX(-50%); margin-left:2px;">LOSS</span>

            `;

        }



        // আল্ট্রা-টাইট ফেইন্ট ডিভাইডার সহ টেবিল রো জেনারেটর

        const logItem = document.createElement('div');

        logItem.style.cssText = "display:grid; grid-template-columns:0.9fr 1fr 0.6fr 0.6fr 1.2fr; font-size:7.5px; color:#fff; font-weight:bold; text-align:center; padding:2px 0px; background:#000000; border-bottom:0.5px solid rgba(255,255,255,0.12); align-items:center; box-sizing:border-box; line-height:1; transition:all 0.3s ease; position:relative;";



        logItem.innerHTML = `

            <div style="color: #fef08a; font-family:monospace; font-size:7px; white-space:nowrap; display:flex; justify-content:center; align-items:center;">#${timeStr}</div>

            <div style="color:${valColor}; text-shadow:0 0 4px ${valGlow}; font-size:7.5px; font-weight:900; white-space:nowrap; text-transform:uppercase; display:flex; justify-content:center; align-items:center;">${displayVal}</div>

            <div style="color:#fbbf24; font-family:monospace; font-size:7.5px; white-space:nowrap; display:flex; justify-content:center; align-items:center;">${stepLevelText}</div>

            <div style="color:#cbd5e1; font-size:7.5px; white-space:nowrap; display:flex; justify-content:center; align-items:center;">${accuracyText}</div>

            <div style="position:relative; display:flex; align-items:center; justify-content:center; height:14px; width:100.25%;">

                ${outcomeContent}

            </div>

        `;



        // নতুন রো টেবিলের সবার উপরে ইনজেক্ট করা

        historyLog.insertBefore(logItem, historyLog.firstChild);

        

        // মেমোরি লোড কমাতে ১০টি রো এর অতিরিক্ত ডাটা রিমুভ করা

        if (historyLog.children.length > 10) {

            historyLog.removeChild(historyLog.lastChild);

        }

    }

}





// Compact Live 12-Hour System Clock Loop with AM/PM

setInterval(() => {

    const clockEl = document.getElementById('ui-live-clock');

    if (clockEl) {

        const now = new Date();

        let hours = now.getHours();

        const minutes = now.getMinutes().toString().padStart(2, '0');

        const seconds = now.getSeconds().toString().padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';

        

        hours = hours % 12;

        hours = hours ? hours : 12; // The hour '0' should be '12'

        const hrStr = hours.toString().padStart(2, '0');

        

        clockEl.innerText = `${hrStr}:${minutes}:${seconds} ${ampm}`;

    }

}, 1000);



window.resetStats = function() {

    totalGames = 0;

    winCount = 0;

    lossCount = 0;

    previousPrediction = null;

    martingaleLevel = 0;

    sessionStorage.clear(); 

    localStorage.clear();

    updateStatsUI();

};



// অ্যানিমেশনের জন্য CSS

const wingoStyle = document.createElement('style');

wingoStyle.textContent = `

    .wingo-star {

        position: fixed;

        top: -50px;

        pointer-events: none;

        z-index: 9999;

        animation-name: wingoFall;

        animation-timing-function: linear;

        animation-fill-mode: forwards;

    }

    @keyframes wingoFall {

        0% { transform: translateY(0); }

        100% { transform: translateY(110vh); }

    }

`;

document.head.appendChild(wingoStyle);



// =================================================================

// ২. অডিও এবং স্টার শাওয়ার ইফেক্ট ফাংশন (১০০% অক্ষত)

// =================================================================

function playWingoSound(type) {

    try {

        const AudioContext = window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        const ctx = new AudioContext();

        

        if (type === 'win') {

            triggerStarShower();

            const notes = [523.25, 659.25, 783.99, 1046.50]; 

            notes.forEach((freq, i) => {

                setTimeout(() => {

                    const osc = ctx.createOscillator();

                    const gain = ctx.createGain();

                    osc.type = 'triangle';

                    osc.frequency.setValueAtTime(freq, ctx.currentTime);

                    gain.gain.setValueAtTime(0.15, ctx.currentTime);

                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

                    osc.connect(gain);

                    gain.connect(ctx.destination);

                    osc.start();

                    osc.stop(ctx.currentTime + 0.4);

                }, i * 120);

            });

        } else if (type === 'loss') {

            const osc = ctx.createOscillator();

            const gain = ctx.createGain();

            osc.type = 'sawtooth';

            osc.frequency.setValueAtTime(220, ctx.currentTime); 

            osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.5); 

            gain.gain.setValueAtTime(0.15, ctx.currentTime);

            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

            osc.connect(gain);

            gain.connect(ctx.destination);

            osc.start();

            osc.stop(ctx.currentTime + 0.5);

        }

    } catch (e) { console.log("Audio blocked by browser policy."); }

}



function triggerStarShower() {

    const starCount = 50;

    for (let i = 0; i < starCount; i++) {

        setTimeout(() => {

            const star = document.createElement('div');

            star.className = 'wingo-star';

            star.innerHTML = ['🌟', '✨️‍', '🌟', '✨️‍', '🌟', '✨', '🌟', '✨'][Math.floor(Math.random() * 8)];

            star.style.left = Math.random() * 100 + 'vw';

            star.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';

            star.style.fontSize = (Math.random() * 15 + 15) + 'px';

            star.style.opacity = Math.random();

            document.body.appendChild(star);

            setTimeout(() => star.remove(), 3000);

        }, i * 60);

    }

}



// =================================================================

// ১. আপনার পাঠানো আসল applyNumberImage ফাংশন (লজিক ১০০% অক্ষত)

// =================================================================

function applyNumberImage(param1, param2 = null) {

    if (!signalTxt) return;

    

    signalTxt.className = "signal-number"; 

    signalTxt.style.backgroundImage = ""; 

    signalTxt.innerText = ""; 



    let type = "";

    let value = "";



    if (param1 && typeof param1 === 'object' && param1.type && param1.value !== undefined) {

        type = param1.type;

        value = param1.value;

        if (typeof updateSureShotUI === 'function') {

            updateSureShotUI(param1);

        }

    }

    else if (param2 !== null) {

        type = param1;

        value = param2;

    } 

    else {

        if (typeof param1 === 'number' || !isNaN(param1)) {

            type = 'number';

            value = param1;

        } else {

            type = 'text';

            value = param1;

        }

    }



    if (type === 'number') {

        signalTxt.classList.add(`n${value}`);

        signalTxt.innerText = value; 

    } else {

        const cleanValue = String(value).trim();

        const textValue = cleanValue.toUpperCase();

        

        signalTxt.innerText = textValue;

        signalTxt.classList.add(`p-${cleanValue.toLowerCase()}`); 

    }



    if (typeof updateStatsUI === 'function') {

        updateStatsUI();

    }

}



// =================================================================

// ২. গেম লজিক ও ক্যালকুলেশন কোড (উইন/লস লজিক অক্ষত)

// =================================================================

function getColor(num) {

    if (num === 0) return "Red-Violet";

    if (num === 5) return "Green-Violet";

    if (num % 2 === 0) return "Red";

    return "Green";

}



function checkWinLoss(actualNum, pred) {

    if (!pred || actualNum === null || actualNum === undefined || isNaN(actualNum)) return; 

    

    if (pred.value === "Skip" || pred.type === "skip") {

        console.log(" Game skipped by safety engine. No stats updated.");

        previousPrediction = null;

        updateStatsUI();

        return;

    }



    let isWin = false;

    totalGames++;



    if (pred.type === "number") {

        if (actualNum === Number(pred.value)) isWin = true;

    } 

    else if (pred.type === "size") {

        const actualSize = actualNum >= 5 ? "Big" : "Small";

        if (actualSize.toLowerCase() === String(pred.value).toLowerCase()) isWin = true;

    } 

    else if (pred.type === "color") {

        const actualColor = getColor(actualNum);

        if (actualColor.toLowerCase().includes(String(pred.value).toLowerCase())) isWin = true;

    }



    // [FIXED]: মার্টিনগেল লেভেল ট্র্যাকিং আপনার শর্ত অনুযায়ী ১ থেকে শুরু করে ফিক্স করা হয়েছে।

    if (isWin) {

        winCount++;



        // উইন হয়েছে, তাই কারেন্ট লেভেলটি UI-তে পাঠানো হচ্ছে

        if (typeof updateSureShotUI === 'function') {

            updateSureShotUI({

                ...pred,

                targetLevel: martingaleLevel, 

                status: 'win'

            });

        }



        martingaleLevel = 1; // [FIX]: উইন হওয়ার কারণে লেভেল রিসেট হয়ে আবার ১ এ ফিরে যাবে।

        playWingoSound('win');   

        triggerStarShower();     

        console.log(`💥 WIN    => ${pred.type},  ${pred.value}, Actual: ${actualNum}`);



    } else {

        lossCount++;



        // যে লেভেলে লস হয়েছে, সেই লেভেলটি আগে UI-তে পাঠানো হচ্ছে

        if (typeof updateSureShotUI === 'function') {

            updateSureShotUI({

                ...pred,

                targetLevel: martingaleLevel, 

                status: 'loss'

            });

        }



        // [FIX]: লস হওয়ায় লেভেল ১ বাড়বে। লেভেল ৭ এর বেশি হলে বা লস লুপ শেষ হলে আবার ১ এ ফিরে যাবে।

        martingaleLevel = martingaleLevel >= 7 ? 1 : martingaleLevel + 1; 

        playWingoSound('loss');  

        console.log(`⛔ LOSS   => ${pred.type},  ${pred.value}, NUM => ${actualNum}`);

    }



    // ডেটা স্টোরেজ আপডেট

    sessionStorage.setItem("totalGames", totalGames);

    sessionStorage.setItem("winCount", winCount);

    sessionStorage.setItem("lossCount", lossCount);

    sessionStorage.setItem("martingaleLevel", martingaleLevel);



    localStorage.setItem("totalGames", totalGames);

    localStorage.setItem("winCount", winCount);

    localStorage.setItem("lossCount", lossCount);

    localStorage.setItem("martingaleLevel", martingaleLevel);



    previousPrediction = null;

    if (typeof localStorage.removeItem === 'function') localStorage.removeItem("previousPrediction");

    

    if (typeof updateStatsUI === 'function') {

        updateStatsUI();

    }

}







    // =================================================================

//  ALPHA-DOMINATOR ACCURACY ENGINE - PART 1/4 (CORE ENGINE)

//  FIXED: VALIDATED ARRAY INDEX SEGMENTATION & SPECIAL NUMBER COUPLING

// =================================================================

function calculatePrediction(hData, sData) {

    let history = [];

    

    // গ্লোবাল ভ্যারিয়েবল ট্র্যাকিং ও সেফটি প্রোটেকশন গেট

    const currentMartingale = (typeof martingaleLevel !== 'undefined') ? martingaleLevel : 1;

    const currentTotalGames = (typeof totalGames !== 'undefined') ? totalGames : 0;

    const currentWinCount = (typeof winCount !== 'undefined') ? winCount : 0;

    

    // ওয়ালেট ব্যালেন্স ট্র্যাকিং (গ্লোবাল ভ্যারিয়েবল না থাকলে ১০০০ বেসলাইন)

    const walletBalance = (typeof userWalletBalance !== 'undefined') ? userWalletBalance : 1000;



    // ১. হাই-ক্যাপাসিটি ডাটা ফিল্টারিং (১৫টি পিরিয়ড ব্যাকলগ এনালাইসিস)

    if (hData && Array.isArray(hData) && hData.length > 0) {

        history = hData.map(item => Number(item.number)).filter(n => !isNaN(n) && n >= 0 && n <= 9);

    } else if (sData && sData.history && Array.isArray(sData.history)) {

        history = sData.history.map(n => Number(n)).filter(n => !isNaN(n) && n >= 0 && n <= 9);

    }

    

    // পর্যাপ্ত ডাটা না থাকলে রিস্ক-ফ্রি মোড

    if (history.length < 10) {

        const initMode = { type: "skip", value: "Skip", targetLevel: currentMartingale, isSureShot: false, percentage: 0, suggestedBet: 0, marketMode: "INITIALIZING", patternMode: "COLLECTING_DATA" };

        if (typeof updateSureShotUI === 'function') updateSureShotUI(initMode);

        return initMode;

    }



    // নিখুঁত ১০টি পিরিয়ডের প্রাইমারি ডেটা আইসোলেশন

    const cleanHistory = history.slice(0, 10);

    

    // সাইজ ও কালার ডাইনামিক অ্যারে ম্যাপিং

    const sizes = cleanHistory.map(n => n >= 5 ? "Big" : "Small");

    const colors = cleanHistory.map(n => {

        if (typeof getColor === 'function') {

            const c = getColor(n);

            if (c.includes("Green")) return "Green";

            if (c.includes("Red")) return "Red";

            return "Violet";

        }

        // জেনুইন ক্যাসিনো স্ট্যান্ডার্ড ফলব্যাক ম্যাপিং (০ ও ৫ স্পেশাল হ্যান্ডলিং সহ)

        if ([1, 3, 7, 9, 5].includes(n)) return "Green";

        if ([2, 4, 6, 8, 0].includes(n)) return "Red";

        return "Violet";

    });



    let sizePatternScore = { Big: 0, Small: 0 };

    let colorPatternScore = { Green: 0, Red: 0 };

    

    let marketMode = "RANGING_MARKET"; 

    let sizePatternMode = "ALGO_REVERSION";

    let colorPatternMode = "ALGO_REVERSION";



    // ২. মার্কেট মুভমেন্ট এবং ডাইনামিক ভোলাটিলিটি ইনডেক্স হিসাব

    let sizeChanges = 0;

    let colorChanges = 0;

    for (let i = 0; i < 9; i++) {

        if (sizes[i] !== sizes[i+1]) sizeChanges++;

        if (colors[i] !== colors[i+1] && colors[i] !== "Violet" && colors[i+1] !== "Violet") colorChanges++;

    }

    const sizeVolatility = sizeChanges / 9;

    const colorVolatility = colorChanges / 9;

    const totalVolatility = (sizeVolatility + colorVolatility) / 2;



    // ৩. স্ট্র্রিক্ট RUN এবং STREAK ট্র্যাকিং

    let sizeStreak = 1;

    for (let i = 0; i < 9; i++) {

        if (sizes[i] === sizes[i+1]) sizeStreak++; else break;

    }

    let colorStreak = 1;

    for (let i = 0; i < 9; i++) {

        if (colors[i] === colors[i+1] && colors[i] !== "Violet") colorStreak++; else break;

    }



    // 🚨 ফিক্সড: ভ্যারিয়েবল অ্যাসাইনমেন্ট ডাইরেক্ট অ্যারে ইনডেক্স রেফারেন্স করা হলো

    const s0 = sizes[0], s1 = sizes[1], s2 = sizes[2], s3 = sizes[3], s4 = sizes[4], s5 = sizes[5];

    const c0 = colors[0], c1 = colors[1], c2 = colors[2], c3 = colors[3], c4 = colors[4], c5 = colors[5];



    // ৪. গ্লোবাল জেনুইন মার্কেট স্টেট ডিটেকশন

    if (sizeStreak >= 4 || colorStreak >= 4) {

        marketMode = "STRONG_TREND"; 

    } else if (totalVolatility >= 0.75) {

        marketMode = "HIGH_VOLATILITY"; 

    } else if (totalVolatility <= 0.15) {

        marketMode = "LOW_VOLATILITY"; 

    } else {

        marketMode = "RANGING_MARKET"; 

    }



    // ⚡ ৫. সাইজ প্যাটার্ন অ্যানালাইসিস ইঞ্জিন

    if (sizeStreak >= 4) {

        sizePatternMode = "TREND_FOLLOWING"; 

        if (s0 === "Big") sizePatternScore.Big += 95; else sizePatternScore.Small += 95;

    } else if (s0 !== s1 && s1 !== s2 && s2 !== s3) {

        sizePatternMode = "SINGLE_ALTERNATE"; 

        if (s0 === "Big") sizePatternScore.Small += 90; else sizePatternScore.Big += 90;

    } else if (s0 === s1 && s1 !== s2 && s2 === s3 && s3 !== s4 && s4 === s5) {

        sizePatternMode = "DOUBLE_ALTERNATE"; 

        if (s0 === "Big") sizePatternScore.Small += 85; else sizePatternScore.Big += 85;

    } else {

        sizePatternMode = "ALGO_REVERSION"; 

        cleanHistory.forEach((num, index) => {

            let weight = Math.pow(0.85, index);

            if (index === 0) weight *= 3.0;

            if (index === 1) weight *= 5.5;

            if (index === 2) weight *= 4.0;

            if (num >= 5) sizePatternScore.Big += weight; else sizePatternScore.Small += weight;

        });

    }



    // ⚡ ৬. কালার প্যাটার্ন অ্যানালাইসিস ইঞ্জিন

    if (colorStreak >= 4) {

        colorPatternMode = "TREND_FOLLOWING";

        if (c0 === "Green") colorPatternScore.Green += 95; else colorPatternScore.Red += 95;

    } else if (c0 !== c1 && c1 !== c2 && c2 !== c3) {

        colorPatternMode = "SINGLE_ALTERNATE";

        if (c0 === "Green") colorPatternScore.Red += 90; else colorPatternScore.Green += 90;

    } else if (c0 === c1 && c1 !== c2 && c2 === c3 && c3 !== c4 && c4 === c5) {

        colorPatternMode = "DOUBLE_ALTERNATE";

        if (c0 === "Green") colorPatternScore.Red += 85; else colorPatternScore.Green += 85;

    } else {

        colorPatternMode = "ALGO_REVERSION";

        cleanHistory.forEach((num, index) => {

            let weight = Math.pow(0.85, index);

            if (index === 0) weight *= 3.0;

            if (index === 1) weight *= 5.5;

            if (index === 2) weight *= 4.0;

            if (typeof getColor === 'function') {

                const rawColor = getColor(num);

                if (rawColor.includes("Green")) colorPatternScore.Green += weight;

                if (rawColor.includes("Red")) colorPatternScore.Red += weight;

            } else {

                if ([1, 3, 7, 9, 5].includes(num)) colorPatternScore.Green += weight;

                if ([2, 4, 6, 8, 0].includes(num)) colorPatternScore.Red += weight;

            }

        });

    }

    // =================================================================

    //  ALPHA-DOMINATOR ACCURACY ENGINE - PART 2/4 (DYNAMIC CHAIN ENGINE)

    //  FIX REASON: FIXED LOGICAL COMPLIANCE & ELIMINATED EMPTY MATRIX ARTIFACTS

    // =================================================================

    const totalSizeWeight = sizePatternScore.Big + sizePatternScore.Small;

    const totalColorWeight = colorPatternScore.Green + colorPatternScore.Red;



    const sizeConfidence = totalSizeWeight > 0 ? (Math.max(sizePatternScore.Big, sizePatternScore.Small) / totalSizeWeight) : 0;

    const colorConfidence = totalColorWeight > 0 ? (Math.max(colorPatternScore.Green, colorPatternScore.Red) / totalColorWeight) : 0;



    let bestSize = sizePatternScore.Big >= sizePatternScore.Small ? "Big" : "Small";

    let bestColor = colorPatternScore.Green >= colorPatternScore.Red ? "Green" : "Red";



    let decision = {};

    if (sizeConfidence >= colorConfidence) {

        decision = { type: "size", value: bestSize, isSureShot: false, confidence: sizeConfidence, selectedPattern: sizePatternMode };

    } else {

        decision = { type: "color", value: bestColor, isSureShot: false, confidence: colorConfidence, selectedPattern: colorPatternMode };

    }



    // 🛑 スマート ریس্ক ফিল্টার (মোড স্কিপ হলেও বেট সচল)

    let isMarketSkipped = false;

    if ((marketMode === "HIGH_VOLATILITY" || decision.selectedPattern === "ALGO_REVERSION") && sizeConfidence < 0.55 && colorConfidence < 0.55) {

        isMarketSkipped = true;

        decision = { type: "skip", value: "Skip", isSureShot: false, selectedPattern: "RISK_AVOIDANCE" };

    }



    // 🛑 হাই-মার্টিঙ্গেল প্রোটেকশন লক

    if (currentMartingale >= 5 && !isMarketSkipped) {

        if (decision.confidence < 0.75 || marketMode === "HIGH_VOLATILITY") {

            isMarketSkipped = true;

            decision = { type: "skip", value: "Skip", isSureShot: false, selectedPattern: "DEEP_CHAIN_LOCK" };

        }

    }



    // ৯. বেস পার্সেন্টেজ ক্যালকুলেশন

    let finalPercentage = 50; 

    if (!isMarketSkipped) {

        let basePercentage = Math.round(decision.confidence * 100);

        let liveWinRate = 70; 

        if (currentTotalGames > 0) {

            liveWinRate = Math.round((currentWinCount / currentTotalGames) * 100);

        }

        finalPercentage = Math.round((basePercentage * 0.75) + (liveWinRate * 0.25));



        if (finalPercentage >= 78 && currentMartingale === 1 && marketMode !== "HIGH_VOLATILITY" && decision.selectedPattern !== "ALGO_REVERSION") {

            decision.isSureShot = true;

            if (finalPercentage > 85) finalPercentage = 85;

        } else {

            decision.isSureShot = false;

            if (finalPercentage > 65) finalPercentage = Math.round(65 - (currentMartingale * 2.5));

        }

        if (currentMartingale >= 2) finalPercentage -= (currentMartingale - 1) * 4;

        if (finalPercentage > 85) finalPercentage = 85;

        if (finalPercentage < 25) finalPercentage = 25;

    } else {

        finalPercentage = Math.max(20, 45 - (currentMartingale * 2));

    }



    decision.percentage = finalPercentage;



    // 💰 ১১. আপনার অনুরোধ অনুযায়ী পিওর ডাবল মার্টিঙ্গেল ৭-স্টেপ চেইন (১০, ২০, ৪০, ৮০...)

    // ওয়ালেট ব্যালেন্স যদি ১৫০০+ হয় তবে বেস বেট স্বয়ংক্রিয়ভাবে ১৫ টাকা হয়ে যাবে (১৫, ৩০, ৬০...)

    let baseBetAmount = (walletBalance >= 1500) ? 15 : 10; 

    let finalBetSize = baseBetAmount;



    // ডাইনামিক ২ গুণিতক চেইন ম্যাথমেটিক্যাল ফর্মুলা (১০, ২০, ৪০, ৮০, ১৬০, ৩২০, ৬৪০/৬৫০, ১৩০০)

    if (currentMartingale >= 1 && currentMartingale <= 8) {

        finalBetSize = baseBetAmount * Math.pow(2, currentMartingale - 1);

        

        // আপনার কন্ডিশন অনুযায়ী রাউন্ডিং অ্যাডজাস্টমেন্ট (৬৪০ কে ৬৫০ এবং ১২৮০ কে ১৩০০ করা)

        if (baseBetAmount === 10) {

            if (currentMartingale === 7) finalBetSize = 650;

            if (currentMartingale === 8) finalBetSize = 1300;

        }

        // ১৫ টাকার সিকোয়েন্সের জন্য রাউন্ডিং অ্যাডজাস্টমেন্ট (৯৬০ কে ৯৮০ এবং ১৯২০ কে ২০০০ করা)

        if (baseBetAmount === 15) {

            if (currentMartingale === 7) finalBetSize = 980;

            if (currentMartingale === 8) finalBetSize = 2000;

        }

    } else {

        finalBetSize = baseBetAmount * Math.pow(2, 6); // ক্যাপিটাল সেফটি লক

    }



    if (finalBetSize > walletBalance) finalBetSize = walletBalance; 



    decision.suggestedBet = finalBetSize; 

    decision.marketMode = marketMode;

    decision.patternMode = isMarketSkipped ? (decision.selectedPattern || "SKIPPED") : decision.selectedPattern;

    decision.targetLevel = currentMartingale;



    delete decision.confidence;

    delete decision.selectedPattern;



    if (typeof updateSureShotUI === 'function') updateSureShotUI(decision);

    return decision;

}



                    



async function fetchMarketData() {

    try {

        const ts = Date.now();

        const [resHistory, resServer] = await Promise.allSettled([

            fetch(`https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json?ts=${ts}`),

            fetch(`https://www.gajarbotol.site/hack/30.php`)

        ]);

        let hData = (resHistory.status === 'fulfilled') ? (await resHistory.value.json())?.data?.list : null;

        let sData = (resServer.status === 'fulfilled') ? (await resServer.value.json()) : null;

        return { hData, sData };

    } catch (e) { return { hData: null, sData: null }; }

}



async function updateSignal(calculatedPeriod) {

    if (currentPeriod === calculatedPeriod) return;

    currentPeriod = calculatedPeriod;

   

    if (signalTxt) signalTxt.style.display = 'none';

    if (loaderBox) loaderBox.style.display = 'flex';



    const marketData = await fetchMarketData();

    

    if (marketData.hData && Array.isArray(marketData.hData) && marketData.hData.length > 0) {

        const latestRecord = marketData.hData[0]; 

        const latestApiNumber = Number(latestRecord.number);

        

        if (previousPrediction) {

            checkWinLoss(latestApiNumber, previousPrediction);

        }

    }

    const predictedResult = calculatePrediction(marketData.hData, marketData.sData);

    

    previousPrediction = predictedResult;

    localStorage.setItem("previousPrediction", JSON.stringify(predictedResult));



    setTimeout(() => {

        if (loaderBox) loaderBox.style.display = 'none';

        if (signalTxt) signalTxt.style.display = 'block';

        

        applyNumberImage(predictedResult);

       

        if (periodNum) periodNum.innerText = calculatedPeriod;

    }, 2000); 

}



function syncWithOfficialTime() {

    const now = new Date();

    const seconds = now.getSeconds();

    

    let timeLeft = 30 - (seconds % 30);

   

    if (timerTxt) {

        timerTxt.innerText = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;

    }   

    if (progressFill) {

        const percentage = (timeLeft / 30) * 100;

        progressFill.style.width = `${percentage}%`;

    }

    const year = now.getUTCFullYear();

    const month = String(now.getUTCMonth() + 1).padStart(2, '0');

    const date = String(now.getUTCDate()).padStart(2, '0');



    const totalMinutes = (now.getUTCHours() * 60) + now.getUTCMinutes();

    let periodSequence = (totalMinutes * 2) + (now.getUTCSeconds() >= 30 ? 2 : 1);

    const formattedSequence = String(periodSequence).padStart(4, '0');

    const calculatedPeriod = `${year}${month}${date}06${formattedSequence}`;

    

    if (timeLeft === 30) {

        updateSignal(calculatedPeriod);

    } else if (currentPeriod === "") {

        if (periodNum) periodNum.innerText = calculatedPeriod;

        

        fetchMarketData().then(marketData => {

            const initialNum = calculatePrediction(marketData.hData, marketData.sData);

            applyNumberImage(initialNum);

            previousPrediction = initialNum;

            localStorage.setItem("previousPrediction", JSON.stringify(initialNum));

        });

        

        currentPeriod = calculatedPeriod;

    }

}



syncWithOfficialTime();

setInterval(syncWithOfficialTime, 500);



document.addEventListener("DOMContentLoaded", () => {

    updateStatsUI();

});



const ADMIN_PASSWORD = "";

const START_DATE = new Date("2026-07-03T01:30:30").getTime();

const EXPIRY_TIME = 3 * 24 * 60 * 60 * 1000;



const PASSWORDS = [

    "HBB9VJUN03", "HHB6NJUN06", "zxZxXz", "HVI8LJUN12", "HBI5QJUN15", 

    "BVH9AJUN18", "HBB2HJUN21", "HHB7MJUN24", "BBH4RJUN27", "HVI1ZJUN30", 

    "HBI6GJUL03", "BVH3VJUL06", "HBB8FJUL09", "HHB5KJUL12", "BBH9DJUL15", 

    "HVI2WJUL18", "HBI7PJUL21", "BVH4SJUL24", "HBB1NJUL27", "HHB6TJUL30", 

    "BBH3XAUG02", "HVI8BAUG05", "HBI5MAUG08", "BVH9LAUG11", "HBB2GAUG14", 

    "HHB7AAUG17", "BBH4VAUG20", "HVI1FAUG23", "HBI6QAUG26", "BVH3YAUG29", 

    "HBB8CSEP01", "HHB5HSEP04", "BBH9KSEP07", "HVI2NSEP10", "HBI7WSEP13"

];



function injectCompactCountdownUI() {

    const input = document.getElementById("passInput");

    if (!input) return;



    if (document.getElementById("vipCompactWrapper")) return;



const wrapper = document.createElement("div");

wrapper.id = "vipCompactWrapper";

wrapper.style.cssText = "width: 100%; text-align: center; font-size: 10.40px; opacity: 0.85; line-height: 1; letter-spacing: 0.5px; margin-bottom: 10px; font-family: sans-serif;";



wrapper.innerHTML = `

    <span id="passExpiredDay" style="color: #ff1744; font-weight: 600; display: block;font-size: 10px;  margin-bottom: 3px;"></span>

    <span id="vipCountdown" style="color: #00e5ff; font-weight: 600; display: block;"></span>

    <div id="passStartDay" style="display: none;"></div>

`;

    input.parentNode.insertBefore(wrapper, input);

}



if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", injectCompactCountdownUI);

} else {

    injectCompactCountdownUI();

}



/* ====== VIP COUNTDOWN SYSTEM (FIXED 3-LEVEL) ====== */



function getCurrentPassword() {

    const now = Date.now(), passed = now - START_DATE;

    if (passed < 0) return null;

    const index = Math.floor(passed / EXPIRY_TIME);

    return PASSWORDS[index] || null;

}



function togglePass() { 

    const p = document.getElementById('passInput');

    if(p) p.type = p.type === 'password' ? 'text' : 'password'; 

}

    

setInterval(() => {

    

    injectCompactCountdownUI();



    const now = Date.now();

    const passed = now - START_DATE;

    const index = Math.floor(passed / EXPIRY_TIME);

    

    const startEl = document.getElementById('passStartDay');

    const expEl = document.getElementById('passExpiredDay');

    const durationEl = document.getElementById('vipCountdown');



    if (!durationEl) return;



    if (passed < 0) {

        durationEl.innerText = "WAITING...";

    } else {

        const currentStart = START_DATE + (index * EXPIRY_TIME);

        const currentExpiry = currentStart + EXPIRY_TIME;

        

        const formatShort = (t) => {

            const d = new Date(t);

            const day = String(d.getDate()).padStart(2, '0');

            const month = d.toLocaleString('en-GB', { month: 'short' });

            let hours = d.getHours();

            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;

            hours = hours ? hours : 12;

            const minutes = String(d.getMinutes()).padStart(2, '0');

            return `${day} ${month} ${hours}:${minutes} ${ampm}`;

        };



        const rem = currentExpiry - now;

        const d = Math.floor(rem / 86400000);

        const h = Math.floor((rem % 86400000) / 3600000);

        const m = Math.floor((rem % 3600000) / 60000);

        const s = Math.floor((rem % 60000) / 1000);



        if(startEl) startEl.innerText = formatShort(currentStart);

        if(expEl) expEl.innerText = `${formatShort(currentExpiry)}`;

        durationEl.innerText = `${d}d ${h}h ${m}m ${s}s`;

    }

}, 1000);



// =================================================================

// ⌨️ কি-বোর্ড এন্টার কি (Enter Key) প্রেস লিসেনার সিঙ্ক

// =================================================================

document.addEventListener("DOMContentLoaded", () => {

    const passInput = document.getElementById("passInput");

    if (passInput) {

        passInput.addEventListener("keyup", function(event) {

            if (event.key === "Enter") {

                checkPassword();

            }

        });

    }

});



// =================================================================

// 🚀 ডাইনামিক সাইবার টোস্ট নোটিফিকেশন ইঞ্জিন (পিওর জাভাস্ক্রিপ্ট গ্লো)

// =================================================================

function showLockNotification(message, color) {

    // স্ক্রিনে আগের কোনো লক টোস্ট নোটিফিকেশন থাকলে তা দ্রুত মুছে ফেলা

    const oldToast = document.getElementById("lock-popup-toast");

    if (oldToast) oldToast.remove();



    // পিওর জাভাস্ক্রিপ্ট দিয়ে ডাইনামিক 'div' ও ইউনিক 'id' তৈরি

    const toast = document.createElement('div');

    toast.id = 'lock-popup-toast';

    toast.innerText = message;



    // টোস্ট পপআপের সম্পূর্ণ প্রিমিয়াম সিএসএস স্টাইল ইন-লাইন ইনজেকশন

    toast.style.position = 'fixed';

    toast.style.top = '80%';

    toast.style.left = '50%';

    toast.style.transform = 'translateX(-50%) scale(1)';

    toast.style.background = 'rgba(10, 11, 14, 0.94)';

    toast.style.backdropFilter = 'blur(12px)';

    toast.style.webkitBackdropFilter = 'blur(12px)';

    toast.style.border = `2px solid ${color}`;

    toast.style.borderRadius = '30px';

    toast.style.padding = '11px 26px';

    toast.style.fontSize = '11px';

    toast.style.fontWeight = '800';

    toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';

    toast.style.letterSpacing = '1px';

    toast.style.textTransform = 'uppercase';

    toast.style.zIndex = '10000001';

    toast.style.pointerEvents = 'none';

    toast.style.boxShadow = `0 0 20px ${color}88, inset 0 0 10px ${color}33`;

    toast.style.color = color;

    toast.style.opacity = '1';

    toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';



    // নোটিফিকেশন বক্সটি বডিতে ইনসার্ট করা

    document.body.appendChild(toast);



    // ২.৫ সেকেন্ড পর স্মুথলি ফেইড আউট দিয়ে DOM থেকে রিমুভ করা

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform = "translateX(-50%) translateY(-25px) scale(0.85)";

        setTimeout(() => toast.remove(), 200); // মেমোরি সম্পূর্ণ ক্লিন

    }, 1000);

}



/* ====== PASSWORD CHECK & LOCK SCREEN SYSTEM ====== */



function checkPassword() {

    const input = document.getElementById("passInput");

    const lockScreen = document.getElementById("lockScreen");

    if (!input || !lockScreen) return;



    const enteredPassword = input.value.trim();

    const currentVipPassword = getCurrentPassword();



    // ১. পাসওয়ার্ড ১০০% সঠিক হলে - ডাইনামিকালি START বাটন মেকার চালু

    if (enteredPassword === ADMIN_PASSWORD || (currentVipPassword && enteredPassword === currentVipPassword)) {

        

        // লক স্ক্রিনের ভেতরের ইন্টারফেস ক্লিপ করে প্রিমিয়াম বাটন বসানো

        lockScreen.innerHTML = `

        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Segoe UI', Roboto, sans-serif; padding: 20px;">

            <div class="status-title" style="

                color: #00e676;

                font-size: 10px;

                font-weight: 950;

                letter-spacing: 1.5px;

                text-transform: uppercase;

                white-space: nowrap;

                word-break: keep-all;

                background: linear-gradient(180deg, #ffffff 0%, #a4b3e6 100%);

                -webkit-background-clip: text;

                -webkit-text-fill-color: transparent;

                margin-bottom: 25px;

                margin-top: -50px;

            ">ZX TRADER HACK</div>



            <div style="text-align: center; margin-bottom: 15px; margin-top: -10px;">

                <h1 style="margin: 0; padding: 0; height: 0;"></h1>

            </div>



            <button class="lock-btn" id="startWidgetBtn" style="

                background: none; border: none; outline: none; box-shadow: none;

                color: #ffffff; font-weight: 950; font-size: 20px; letter-spacing: 3px;

                margin-top: 10px; padding: 10px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);

                cursor: pointer; text-transform: uppercase; font-family: 'Segoe UI', Roboto, sans-serif;

                transition: all 0.2s ease;

            " onmouseover="this.style.color='#00e5ff'; this.style.textShadow='0 0 15px #00e5ff';" 

               onmouseout="this.style.color='#ffffff'; this.style.textShadow='0 0 8px rgba(255, 255, 255, 0.3)';" >

                START

            </button>

        </div>

        `;



        // 🔔 ডাইনামিক সাকসেস নোটিফিকেশন ফায়ার করা

        showLockNotification("Access Granted. Key Verified!", "#00e5ff");



        // 🛠️ ফিক্সড ইভেন্ট লিসেনার: START বাটনে ক্লিক করলে লক স্ক্রিন সরবে এবং প্রেডিক্টর চালু হবে

        document.getElementById("startWidgetBtn").addEventListener("click", function() {

            lockScreen.classList.add("unlocked");

            

            // [RULE]: আনলক হওয়ার পর গ্লোয়িং শো বাটনটি স্ক্রিনে পপ-আপ করানো হচ্ছে

            const showBtn = document.getElementById('trading-ui-show-btn');

            if (showBtn) {

                showBtn.style.display = 'flex';

                showBtn.className = "pulse-red"; // প্রথম অবস্থায় বাটন লাল হয়ে জ্বলজ্বল করবে

            }

            if (typeof startPredictor === "function") {

                startPredictor();

            }

        });



    } else {

                // ❌ ২. পাসওয়ার্ড ভুল হলে - আল্ট্রা-নিয়ন ব্লিঙ্ক ও শেক মেকানিজম চালু
        input.classList.remove("shake");
        void input.offsetWidth; // ডম রিফ্লো রিসেট
        input.classList.add("shake");
        input.style.borderColor = "#ff1744";
        input.value = "";
        input.placeholder = " invalid key ❗";
        
        // 🔔 ডাইনামিক লাল নিয়ন এরর নোটিফিকেশন ফায়ার করা
        showLockNotification("Invalid Password! .", "#ff1744");
        
        setTimeout(() => {
            input.classList.remove("shake");
            input.style.borderColor = "rgba(255, 255, 255, 0.1)";
            input.placeholder = "Password ...";

            // 🌟 [নতুন ফিক্সড লজিক]: পাসওয়ার্ড ভুল হলে নোটিফিকেশন দেখানোর পর সরাসরি টেলিগ্রামে নিয়ে যাবে
            // "YOUR_TELEGRAM_LINK" এর জায়গায় আপনার আসল টেলিগ্রাম চ্যানেলের লিংকটি বসিয়ে দিন
            window.open("https://t.me", "_blank"); 
        }, 300);
    }


}

document.getElementById("passInput").addEventListener("keyup", function(event) {

    if (event.key === "Enter") {

        checkPassword();

    }

});





    const widget = document.getElementById("real-predictor");

let isDragging = false;

let startX, startY, initialLeft, initialTop;



function dragStart(e) {

    isDragging = true;

    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;

    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

    

    startX = clientX;

    startY = clientY;

    initialLeft = widget.offsetLeft;

    initialTop = widget.offsetTop;

}



function dragMove(e) {

    if (!isDragging) return;

    

    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;

    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

    

    const dx = clientX - startX;

    const dy = clientY - startY;

    

    let newLeft = initialLeft + dx;

    let newTop = initialTop + dy;

   

    const maxLeft = window.innerWidth - widget.offsetWidth;

    const maxTop = window.innerHeight - widget.offsetHeight;

    

    if (newLeft < 0) newLeft = 0;

    if (newLeft > maxLeft) newLeft = maxLeft;

    if (newTop < 0) newTop = 0;

    if (newTop > maxTop) newTop = maxTop;

    

    widget.style.left = `${newLeft}px`;

    widget.style.top = `${newTop}px`;

}



function dragEnd() {

    isDragging = false;

}



widget.addEventListener("mousedown", dragStart);

document.addEventListener("mousemove", dragMove);

document.addEventListener("mouseup", dragEnd);



widget.addEventListener("touchstart", dragStart, { passive: true });

document.addEventListener("touchmove", dragMove, { passive: false }); 

document.addEventListener("touchend", dragEnd);



function preloadPredictionImages() {

    const imageUrls = [

        'https://i.ibb.co.com/Csvg6W69',

        'https://i.ibb.co.com/8nZJqhCr',

        'https://i.ibb.co.com/mrtBf4Qq',

        'https://i.ibb.co.com/jvpgdkhW',

        'https://i.ibb.co.com/XrYSL0Hm',

        'https://i.ibb.co.com/Xf8Pz82g',

        'https://i.ibb.co.com/1f1VXWxp',

        'https://i.ibb.co.com/bM62JGTZ',

        'https://i.ibb.co.com/fdNgCwpq',

        'https://i.ibb.co.com/KcCwwtx3',

    ];

    imageUrls.forEach(url => {

        const img = new Image();

        img.src = url;

    });

}

window.addEventListener('DOMContentLoaded', preloadPredictionImages);

  // ==========================================

    // কন্ডিশনাল গ্লোসহ প্রিমিয়াম পাওয়ার বাটন (Show Button)

    // ==========================================

    const showBtn = document.createElement('button');

    showBtn.id = "trading-ui-show-btn";

    

    // [FIX]: শুরুতে বাটনটি একদম হাইড (none !important) থাকবে যাতে আনলকের আগে দেখা না যায়

    showBtn.style.cssText = `

        position: fixed;

        top: 15px;

        right: 15px;

        z-index: 9999999;

        background: #030712;

        border-radius: 50%;

        width: 44px;

        height: 44px;

        display: none !important; 

        justify-content: center;

        align-items: center;

        cursor: pointer;

        box-sizing: border-box;

        transition: transform 0.25s ease;

        will-change: transform;

    `;

    

    showBtn.innerHTML = `

        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" style="overflow: visible; transition: filter 0.25s ease, stroke 0.25s ease;">

            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>

            <line x1="12" y1="2" x2="12" y2="12"></line>

        </svg>

    `;



    // ল্যাগ-ফ্রি সিএসএস অ্যানিমেশন রুলস

    const styleSheet = document.createElement("style");

    styleSheet.textContent = `

        .pulse-blue {

            border: 2px solid #3b82f6;

            animation: showBtnBluePulse 2s infinite ease-in-out;

        }

        .pulse-blue svg { stroke: #60a5fa; filter: drop-shadow(0 0 4px #3b82f6); }

        .pulse-blue:hover {

            animation-play-state: paused;

            transform: scale(1.1) !important;

            box-shadow: 0 0 20px #3b82f6, inset 0 0 12px #3b82f6 !important;

            border-color: #60a5fa !important;

        }

        .pulse-blue:hover svg { filter: drop-shadow(0 0 8px #60a5fa); }



        .pulse-red {

            border: 2px solid #ef4444;

            animation: showBtnRedPulse 2s infinite ease-in-out;

        }

        .pulse-red svg { stroke: #f87171; filter: drop-shadow(0 0 4px #ef4444); }

        .pulse-red:hover {

            animation-play-state: paused;

            transform: scale(1.1) !important;

            box-shadow: 0 0 20px #ef4444, inset 0 0 12px #ef4444 !important;

            border-color: #f87171 !important;

        }

        .pulse-red:hover svg { filter: drop-shadow(0 0 8px #f87171); }



        @keyframes showBtnBluePulse {

            0% { box-shadow: 0 0 8px #1e40af, inset 0 0 5px #1e40af; border-color: #2563eb; }

            50% { box-shadow: 0 0 16px #3b82f6, inset 0 0 10px #3b82f6; border-color: #60a5fa; }

            100% { box-shadow: 0 0 8px #1e40af, inset 0 0 5px #1e40af; border-color: #2563eb; }

        }

        @keyframes showBtnRedPulse {

            0% { box-shadow: 0 0 8px #991b1b, inset 0 0 5px #991b1b; border-color: #dc2626; }

            50% { box-shadow: 0 0 16px #ef4444, inset 0 0 10px #ef4444; border-color: #f87171; }

            100% { box-shadow: 0 0 8px #991b1b, inset 0 0 5px #991b1b; border-color: #dc2626; }

        }

    `;

    document.head.appendChild(styleSheet);

    

    showBtn.className = "pulse-red";



    if (document.body) {

        document.body.appendChild(showBtn);

    }



    setTimeout(() => {

        const cardEl = document.getElementById('trading-ui-card');

        const hideBtn = document.getElementById('ui-hide-btn');



        if (cardEl) {

            cardEl.style.setProperty('display', 'none', 'important');

            cardEl.style.opacity = '0';

            cardEl.style.transform = 'scale(0.85)';

        }



        if (hideBtn && cardEl) {

            hideBtn.addEventListener('click', (e) => {

                e.stopPropagation();

                cardEl.style.opacity = '0';

                cardEl.style.transform = 'scale(0.85)';

                

                setTimeout(() => {

                    cardEl.style.setProperty('display', 'none', 'important');

                    showBtn.style.setProperty('display', 'flex', 'important');

                    showBtn.className = "pulse-red"; 

                }, 250);

            });

        }



        if (showBtn && cardEl) {

            showBtn.addEventListener('click', (e) => {

                e.stopPropagation();

                showBtn.style.setProperty('display', 'none', 'important');

                cardEl.style.setProperty('display', 'block', 'important');

                

                setTimeout(() => {

                    cardEl.style.opacity = '1';

                    cardEl.style.transform = 'scale(1)';

                    showBtn.className = "pulse-blue"; 

                }, 10);

            });



            showBtn.addEventListener('mouseenter', () => { showBtn.style.transform = 'scale(1.1)'; });

            showBtn.addEventListener('mouseleave', () => { showBtn.style.transform = 'scale(1)'; });

        }

    }, 600);
    // ============================================================================
    // DEDICATED ANTI-BUG DRAGGING ENGINE FOR TRADING UI SHOW BUTTON
    // ============================================================================
    (function() {
        const floatShowBtn = document.getElementById('trading-ui-show-btn');
        if (!floatShowBtn) return;

        let zxDragActive = false;
        let zxHasMoved = false;
        let zxStartX = 0, zxStartY = 0;
        let zxOffsetX = 0, zxOffsetY = 0;

        function startShowBtnDrag(e) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const rect = floatShowBtn.getBoundingClientRect();
            
            zxDragActive = true;
            zxHasMoved = false;
            zxStartX = clientX;
            zxStartY = clientY;

            // ইনিশিয়াল পজিশন ক্যালকুলেট ও লক করা
            floatShowBtn.style.transform = 'none';
            floatShowBtn.style.transition = 'none';
            floatShowBtn.style.right = 'auto';
            floatShowBtn.style.left = rect.left + 'px';
            floatShowBtn.style.top = rect.top + 'px';
            
            zxOffsetX = clientX - rect.left;
            zxOffsetY = clientY - rect.top;
        }

        function doShowBtnDrag(e) {
            if (!zxDragActive) return;
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            // জেনুইন মুভমেন্ট চেক: ৪ পিক্সেলের বেশি নড়লে ড্র্যাগ অ্যাক্টিভ হবে (ভুল ক্লিক এড়াতে)
            if (Math.abs(clientX - zxStartX) > 4 || Math.abs(clientY - zxStartY) > 4) {
                zxHasMoved = true;
            }

            if (e.cancelable) e.preventDefault();
            
            let posX = clientX - zxOffsetX;
            let posY = clientY - zxOffsetY;

            // স্ক্রিন বাউন্ডারি লক (১০ পিক্সেল সেফ জোন)
            posX = Math.max(10, Math.min(posX, window.innerWidth - floatShowBtn.offsetWidth - 10));
            posY = Math.max(10, Math.min(posY, window.innerHeight - floatShowBtn.offsetHeight - 10));

            floatShowBtn.style.left = posX + 'px';
            floatShowBtn.style.top = posY + 'px';
        }

        function endShowBtnDrag(e) {
            if (!zxDragActive) return;
            zxDragActive = false;
            floatShowBtn.style.transition = 'transform 0.25s ease';

            // ফিক্স: যদি বাটন ড্র্যাগ হয়ে পজিশন নড়ে থাকে, তবে ক্লিক ইভেন্ট ব্লক করবে
            if (zxHasMoved) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
            zxHasMoved = false;
        }

        function forceShowBtnBoundary() {
            if (floatShowBtn.style.display === 'none') return;
            const rect = floatShowBtn.getBoundingClientRect();
            let posX = rect.left, posY = rect.top;
            
            if (posX + floatShowBtn.offsetWidth > window.innerWidth) posX = window.innerWidth - floatShowBtn.offsetWidth - 10;
            if (posX < 10) posX = 10;
            if (posY + floatShowBtn.offsetHeight > window.innerHeight) posY = window.innerHeight - floatShowBtn.offsetHeight - 10;
            if (posY < 10) posY = 10;
            
            floatShowBtn.style.left = posX + 'px';
            floatShowBtn.style.top = posY + 'px';
        }

        // মাউস ও টাচ লিসেনার প্রটেকশন লক (ক্যাপচারিং ট্রু দিয়ে ক্লিক ওভাররাইড করা হয়েছে)
        floatShowBtn.addEventListener('mousedown', startShowBtnDrag);
        window.addEventListener('mousemove', doShowBtnDrag);
        window.addEventListener('mouseup', endDragWithTrigger, true);

        floatShowBtn.addEventListener('touchstart', startShowBtnDrag, { passive: true });
        window.addEventListener('touchmove', doShowBtnDrag, { passive: false });
        window.addEventListener('touchend', endDragWithTrigger, true);

        window.addEventListener('resize', forceShowBtnBoundary);

        function endDragWithTrigger(e) {
            endShowBtnDrag(e);
        }
    })();

(function() {
    // ==========================================
    // ১. প্রফেশনাল ডোমেন কনফিগারেশন প্যানেল
    // ==========================================
    const CONFIG = {
        totalDurationDays: 365,                 
        expiryDate: "2027-10-01 00:00:00",    
        telegramUsername: "owner_zihad_sir11" 
    };

    const currentDomain = window.location.hostname || "UNKNOWN_DOMAIN.COM";
    const targetTime = new Date(CONFIG.expiryDate).getTime();
    const currentTime = new Date().getTime();

    // মেয়াদ শেষ না হলে মেইন কোড চলতে দেওয়া হবে
    if (currentTime < targetTime) {
        return; 
    }

    // 🚨 মেয়াদ শেষ! ব্যাকগ্রাউন্ডের সব ফাংশন, টাইমার এবং সাউন্ড চিরতরে স্তব্ধ (Kill) করার ইঞ্জিন
    try {
        // ক) ব্রাউজারের সমস্ত অডিও ইঞ্জিন স্তব্ধ করা (কোনো সাউন্ড বা শব্দ হবে না)
        window.AudioContext = null;
        window.webkitAudioContext = null;

        // খ) পেজে আগে থেকে থাকা সমস্ত অডিও/ভিডিও প্লেয়ার ও তাদের মেমরি ট্র্যাক মুছে ফেলা
        document.querySelectorAll("audio, video").forEach(media => {
            try {
                media.pause();
                media.src = "";
                media.load();
                media.remove();
            } catch (e) {}
        });

        // গ) ব্যাকগ্রাউন্ডে চলমান সমস্ত ইন্টারভাল, লুপ এবং টাইমারস (Loops & Loops) সম্পূর্ণ বন্ধ করা
        const maxIntervalId = window.setInterval(() => {}, 9999);
        for (let i = 1; i <= maxIntervalId; i++) {
            window.clearInterval(i);
            window.clearTimeout(i);
        }
    } catch (error) {}

    // পুরনো উইজেট ইনস্ট্যান্ট ডিলিট লজিক
    const removeBadWidgets = () => {
        ['.fx-box', '#box', '.fx-floating-btn'].forEach(selector => {
            document.querySelector(selector)?.remove();
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            removeBadWidgets();
            renderExpiryDashboard();
        });
    } else {
        removeBadWidgets();
        renderExpiryDashboard();
    }
    window.addEventListener('load', removeBadWidgets);

    // ==========================================
    // ২. আল্ট্রা-কমপ্যাক্ট ডোমেন রিনিউয়াল সিএসএস ইনজেকশন
    // ==========================================
    if (!document.getElementById('fxExpiryStyles')) {
        const styles = document.createElement('style');
        styles.id = 'fxExpiryStyles';
        styles.innerHTML = `
            @import url('https://googleapis.com');
            
            .expire-container {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: #02040a; display: flex; align-items: center;
                justify-content: center; z-index: 2147483647; font-family: 'Inter', sans-serif;
            }
            .expire-card {
                background: #0b0d16; width: 340px; border-radius: 16px;
                border: 2px solid #ff4d4d; 
                box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 77, 77, 0.15);
                overflow: hidden; color: #fff; position: relative;
            }
            .alert-top-bar {
                background: linear-gradient(90deg, #ff4d4d, #cc1111);
                color: #fff; padding: 10px; font-size: 11px; font-weight: 900;
                letter-spacing: 0.5px; text-transform: uppercase; font-family: 'Orbitron', sans-serif;
                display: flex; align-items: center; justify-content: center; gap: 6px;
            }
            .domain-badge {
                background: rgba(255, 77, 77, 0.04); border: 1px dashed rgba(255, 77, 77, 0.3);
                padding: 10px; border-radius: 8px; font-family: 'Orbitron', monospace;
                font-size: 11.5px; color: #ff4d4d; font-weight: bold; margin-bottom: 12px;
                word-break: break-all; display: inline-block; width: 100%; box-sizing: border-box; text-align: center;
            }
            .price-list-container {
                margin-bottom: 12px; padding: 0; display: flex; flex-direction: column; gap: 4px;
            }
            .price-row {
                display: flex; justify-content: space-between; align-items: center;
                background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03);
                padding: 6px 10px; border-radius: 6px; transition: 0.15s ease;
            }
            .price-row:hover { border-color: #ffd700; background: rgba(255,215,0,0.01); }
            
            .badge-feature { font-size: 8px; padding: 1px 4px; border-radius: 3px; font-weight: 700; margin-left: 4px; text-transform: uppercase; }
            .bg-silver { background: #57606f; color: #fff; }
            .bg-gold { background: linear-gradient(45deg, #ffd700, #ff9f43); color: #000; }
            .bg-vip { background: linear-gradient(45deg, #00f2fe, #4facfe); color: #fff; }
            
            .expire-btn {
                width: 100%; padding: 11px; border-radius: 8px; border: none;
                font-weight: 800; font-size: 11px; cursor: pointer; display: flex;
                align-items: center; justify-content: center; text-decoration: none; 
                font-family: 'Orbitron', sans-serif; letter-spacing: 0.5px; 
                transition: all 0.25s ease; box-sizing: border-box;
            }
            .btn-buy { 
                background: linear-gradient(135deg, #00ff87, #60efff); color: #000; 
                box-shadow: 0 4px 14px rgba(0,255,135,0.3); font-weight: 900;
            }
            .btn-buy:hover { transform: translateY(-1.5px); filter: brightness(1.1); box-shadow: 0 6px 18px rgba(0,255,135,0.45); }
            
            .btn-row-container { display: flex; gap: 8px; margin-top: 8px; width: 100%; }
            .btn-care { background: transparent; color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.3); padding: 9px; font-size: 10px; }
            .btn-care:hover { background: rgba(0, 242, 254, 0.05); }

            .btn-cancel { background: #ff4d4d; color: #fff; font-weight: 900; padding: 9px; font-size: 10px; box-shadow: 0 4px 10px rgba(255,77,77,0.15); }
            .btn-cancel:hover { background: #cc1111; transform: scale(0.98); }
        `;
        document.head.appendChild(styles);
    }
// ==========================================
// ৩. প্রফেশনাল মাল্টি-প্যাকেজ ডোমেন রিনিউয়াল ইন্টারফেস
// ==========================================
function renderExpiryDashboard() {
    if (document.getElementById('fxExpiryOverlay')) return; 

    const dashboard = document.createElement('div');
    dashboard.id = 'fxExpiryOverlay';
    dashboard.className = 'expire-container';
    
    const baseTelegramUrl = "https://t.me/owner_zihad_sir11";
    
    const orderText = "*[🪫 SYSTEM ALARM: SUBSCRIPTION EXPIRED 🪫]* \n\n" +
                      "👋 *🖐️ Hello Admin,*\n" +
                      "My platform access has been locked because my domain and hosting license has expired. Please check my status immediately.\n\n" +
                      "🌐 *Expired Domain:* `" + currentDomain + "`\n" +
                      "💼 *Status:* Locked / Suspended\n\n" +
                      "✨ *Action Required:* I want to check the renewal packages and purchase a new license key right away. Please reply to me as soon as possible! 🙏";

    const supportText = "⚠️ *[ URGENT HELP NEEDED ]* ⚠️\n\n" +
                        "Hello Customer Care Team,\n" +
                        "I need urgent support regarding my expired system domain and hosting license.\n\n" +
                        "🌐 *Domain Name:* `" + currentDomain + "`\n" +
                        "🔴 *Issue:* Script cores and calculation matrices are suspended.\n\n" +
                        "Please help me to clear this license block quickly.";

    const orderMessage = encodeURIComponent(orderText);
    const supportMessage = encodeURIComponent(supportText);

    dashboard.innerHTML = `
        <div class="expire-card">
            <div class="alert-top-bar">
                🚨 SYSTEM ALARM: TERMINATED
            </div>
            
            <div style="padding: 16px 14px 14px 14px;">
                
                <h2 style="color: #ff4d4d; font-family: 'Orbitron', sans-serif; font-size: 14px; margin: 0 0 6px 0; font-weight: 900; text-align: center; letter-spacing: 0.5px;">
                 📬   YOUR DOMAIN PLUS HOSTING EXPIRE 🧾
                </h2>
                
                <p style="color: #cfd2d9; font-size: 11px; margin: 0 0 12px 0; text-align: center; line-height: 1.4; font-weight: 600;">
                    Your validation period has ended. The system has officially suspended all calculations, prediction matrices, and script cores.
                </p>

                <div class="domain-badge">
                    📟 DOMAIN NAME - ` + currentDomain + `
                </div>
                
                <div style="font-size: 10px; font-weight: bold; color: #8a8f9d; text-transform: uppercase; letter-spacing: 0.5px; text-align: left; margin-bottom: 6px;">
                    Select Renewal Package (Premium Discounts Active)
                </div>
                
                <div class="price-list-container">
                    <div class="price-row">
                        <div>
                            <span style="font-size: 11px; font-weight: 700; color: #fff;">1 Month</span>
                            <span class="badge-feature bg-silver">Basic</span>
                        </div>
                        <span style="font-size: 11.5px; font-weight: 800; color: #ffd700;">৳255</span>
                    </div>
                    
                    <div class="price-row">
                        <div>
                            <span style="font-size: 11px; font-weight: 700; color: #fff;">3 Months</span>
                            <span class="badge-feature bg-gold">Pro (-2%)</span>
                        </div>
                        <span style="font-size: 11.5px; font-weight: 800; color: #ffd700;">৳750</span>
                    </div>
                    
                    <div class="price-row">
                        <div>
                            <span style="font-size: 11px; font-weight: 700; color: #fff;">5 Months</span>
                            <span class="badge-feature bg-gold">Plus (-4%)</span>
                        </div>
                        <span style="font-size: 11.5px; font-weight: 800; color: #ffd700;">৳1,225</span>
                    </div>

                    <div class="price-row">
                        <div>
                            <span style="font-size: 11px; font-weight: 700; color: #fff;">6 Months</span>
                            <span class="badge-feature bg-gold">Elite (-5%)</span>
                        </div>
                        <span style="font-size: 11.5px; font-weight: 800; color: #ffd700;">৳1,450</span>
                    </div>

                    <div class="price-row" style="border-color: rgba(0, 242, 254, 0.25); background: rgba(0, 242, 254, 0.02);">
                        <div>
                            <span style="font-size: 11px; font-weight: 700; color: #00f2fe;">1 Year</span>
                            <span class="badge-feature bg-vip">VIP (-10%)</span>
                        </div>
                        <span style="font-size: 11.5px; font-weight: 800; color: #00f2fe;">৳2,750</span>
                    </div>

                    <div class="price-row" style="border-color: rgba(0, 242, 254, 0.35); background: rgba(0, 242, 254, 0.03);">
                        <div>
                            <span style="font-size: 11px; font-weight: 700; color: #00f2fe;">2 Years</span>
                            <span class="badge-feature bg-vip">Ultra (-15%)</span>
                        </div>
                        <span style="font-size: 11.5px; font-weight: 800; color: #00f2fe;">৳5,200</span>
                    </div>

                    <div class="price-row" style="border-color: #ffd700; background: rgba(255, 215, 0, 0.03);">
                        <div>
                            <span style="font-size: 11px; font-weight: 700; color: #ffd700;">5 Years</span>
                            <span class="badge-feature bg-vip" style="background:#ffd700; color:#000;">Max (-20%)</span>
                        </div>
                        <span style="font-size: 11.5px; font-weight: 800; color: #ffd700;">৳10,200</span>
                    </div>
                </div>

                <a href="` + baseTelegramUrl + `?text=` + orderMessage + `" target="_blank" class="expire-btn btn-buy">
                    💳 RENEW SUBSCRIPTION NOW
                </a>
                
                <div class="btn-row-container">
                    <a href="` + baseTelegramUrl + `?text=` + supportMessage + `" target="_blank" class="expire-btn btn-care">
                        💬 SUPPORT
                    </a>
                    
                    <button id="fxCancelExpiryBtn" class="expire-btn btn-cancel">
                        🛑 CANCEL & EXIT
                    </button>
                </div>
                
                <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: center; font-size: 8.5px; color: #3a3f4d; font-family: 'Orbitron', sans-serif;">
                    VERIFIED SERVER HARDWARE • SECURE ENCRYPTION
                </div>
            </div>
        </div>
    `;

    // ড্যাশবোর্ডকে সরাসরি বডিতে ইনজেক্ট করার সেফ মেথড
    if (document.body) {
        document.body.appendChild(dashboard);
    } else {
        document.documentElement.appendChild(dashboard);
    }

    // ক্যানসেল লজিক (ক্লিয়ার এবং কিল লজিক সহ)
    document.getElementById('fxCancelExpiryBtn')?.addEventListener('click', () => {
        // ১. বডির ভেতরের সব রেন্ডার করা HTML উপাদান ইনস্ট্যান্ট ফাঁকা করা
        document.body.innerHTML = ""; 
        document.body.style.cssText = "background: #000000 !important; height: 100vh !important; width: 100vw !important; overflow: hidden !important; display: flex !important; align-items: center; justify-content: center;";
        
        // ২. কোনো প্রকার অডিও বা মিডিয়া ট্র্যাক রানিং থাকলে তা কমপ্লিটলি ক্র্যাশ করা (সাউন্ড চিরতরে অফ)
        try {
            window.AudioContext = null;
            window.webkitAudioContext = null;
            document.querySelectorAll("audio, video").forEach(m => { m.pause(); m.src = ""; m.remove(); });
        } catch(e) {}

        // ৩. জোরপূর্বক সব ডম উপাদান এবং স্ক্রিপ্ট ট্যাগ হাইড করা
        const style = document.createElement('style');
        style.innerHTML = "* { display: none !important; } html, body { display: block !important; background: #000 !important; }";
        document.head.appendChild(style);
    });
}

})();
document.addEventListener('contextmenu', event => event.preventDefault());

// F12 এবং Ctrl+Shift+I 
document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) {
        return false;
    }
}

const myDomain = "zihad-ai.netlify.app"; 
if (window.location.hostname !== myDomain && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    alert("Unauthorized access! This script is protected by ZIHAD.");
    document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:50px;'>This is a stolen copy! <br> Please visit the original site: " + myDomain + "</h1>";
    window.location.href = "https://" + myDomain;
}
