resDiv = document.getElementById('result');
if (resDiv) {
    
    resDiv.className = "result animated-result"; 
    resDiv.style.color = clr;
    resDiv.style.filter = "drop-shadow(0 4px 10px rgba(0,0,0,0.9))";
}


(function() {
  "use strict";

  // 1. LOGIN WITH COUNTDOWN
  const loginBox = document.createElement('section');
  loginBox.className = 'login';
  loginBox.id = 'loginBox';

  const loginContainer = document.createElement('article');
  loginContainer.className = 'login-box';

  const loginTitle = document.createElement('h3');
  loginTitle.textContent = ' 𝐑𝐀𝐒𝐈𝐘𝐀𝐍 𝐍𝐄𝐗𝐔𝐒 𝐀𝐈';

  const vipCountdown2 = document.createElement('p');
  vipCountdown2.className = 'countdown';
  vipCountdown2.id = 'vipCountdown2';
  vipCountdown2.style.marginBottom = '25px';
  vipCountdown2.style.letterSpacing = '1px';
  vipCountdown2.textContent = 'VIP EXPIRED';

  const passInput = document.createElement('input');
  passInput.id = 'pass';
  passInput.type = 'password';
  passInput.placeholder = ' Password....';

  const loginBtnGroup = document.createElement('nav');
  loginBtnGroup.className = 'login-btn-group';

  const getBtn = document.createElement('button');
  getBtn.className = 'get-btn';
  getBtn.id = 'getBtn';
  getBtn.textContent = '𝐆𝐄𝐓 key';
  getBtn.onclick = function() { window.open('https://t.me/Habib_Leader_team_11', '_blank'); };

  const unlockBtn = document.createElement('button');
  unlockBtn.className = 'login-btn';
  unlockBtn.id = 'unlockBtn';
  unlockBtn.textContent = '𝐔𝐍𝐋𝐎𝐂𝐊';

  loginBtnGroup.append(getBtn, unlockBtn);
  loginContainer.append(loginTitle, vipCountdown2, passInput, loginBtnGroup);
  loginBox.appendChild(loginContainer);
  document.body.appendChild(loginBox);

  // 2. CHOICE PAGE
  const choicePage = document.createElement('main');
  choicePage.id = 'choicePage';

  const choiceContainer = document.createElement('section');
  choiceContainer.className = 'choice-container';

  const headerBox = document.createElement('header');
  headerBox.className = 'header-box';
  headerBox.innerHTML = '<h1 class="main-header">👑 𝐑𝐀𝐒𝐈𝐘𝐀𝐍 𝐕𝐎𝐈𝐃 𝐏𝐇𝐀𝐍𝐓𝐎𝐌 𝐎𝐏𝐄𝐑𝐀𝐓𝐎𝐑👑</h1><p class="sub-header">圣战哈桑吉克斯交易员...</p>';

  const noticeBox = document.createElement('article');
  noticeBox.className = 'notice-box glass';
  noticeBox.innerHTML = '<h2>🔮𝐀𝐈 𝐌𝐎𝐃𝐄𝐋 𝐑𝐀𝐒𝐈𝐘𝐀𝐍 𝐁𝐎𝐓𝐎𝐋 𝐗🔮</h2>' +
                        '<ul class="notice-list">' +
  '<li>🧬 𝐑𝐄𝐀𝐋 𝐓𝐈𝐌𝐄 𝐖𝐈𝐍𝐆𝐎 𝐏𝐑𝐄𝐃𝐈𝐂𝐓𝐎𝐑</li>' +
  '<li>🎯 𝐍𝐎𝐑𝐓𝐇 𝐒𝐄𝐑𝐕𝐄𝐑 𝐀𝐂𝐓𝐈𝐕𝐄</li>' +
  '<li>⏰ 𝐋𝐈𝐕𝐄 𝐓𝐈𝐌𝐄 𝐂𝐎𝐔𝐍𝐓𝐃𝐎𝐖𝐍</li>' +
  '<li>🔮 𝐁𝐎𝐓𝐎𝐋 𝐀𝐈 𝐀𝐍𝐀𝐋𝐘𝐒𝐈𝐒 𝐌𝐎𝐎𝐃</li>' +
  '<li>🔔 𝐏𝐑𝐎𝐅𝐄𝐒𝐒𝐎𝐍𝐀𝐋 𝐈𝐍𝐓𝐄𝐑𝐅𝐀𝐂𝐄</li>' +
  '<li>🔬 𝐒𝐈𝐍𝐆𝐋𝐄 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐀𝐂𝐂𝐄𝐒𝐒</li>' +
  '<li>💗 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 : √• 𝐳𝐢𝐡𝐚𝐝 𝐡𝐚𝐬𝐚𝐧•</li>' +
'</ul>';


  const vipCountdown = document.createElement('p');
  vipCountdown.className = 'countdown';
  vipCountdown.id = 'vipCountdown';
  vipCountdown.textContent = 'VIP EXPIRED';

  const engineBox = document.createElement('aside');
  engineBox.className = 'engine-box glass';

  const engineTitle = document.createElement('h2');
  engineTitle.className = 'engine-title';
  engineTitle.textContent = '💲 𝐒𝐄𝐋𝐄𝐂𝐓 𝐆𝐀𝐌𝐄 💲';

  const engineButtons = document.createElement('nav');
  engineButtons.className = 'engine-buttons';

  const hzBtn = document.createElement('button');
  hzBtn.className = 'engine-btn hz-btn';
  hzBtn.textContent = '𝐇𝐆𝐙𝐘';
  hzBtn.onclick = function() { if(typeof chooseEngine === 'function') { chooseEngine('hz'); } };

  const dkBtn = document.createElement('button');
  dkBtn.className = 'engine-btn dk-btn';
  dkBtn.textContent = '𝐃𝐊𝐖𝐈𝐍';
  dkBtn.onclick = function() { if(typeof chooseEngine === 'function') { chooseEngine('dk'); } };

  const bdBtn = document.createElement('button');
  bdBtn.className = 'engine-btn btn-bdwin';
  bdBtn.textContent = '𝐁𝐃 𝐖𝐈𝐍 𝟐𝟒';
  bdBtn.onclick = function() { if(typeof chooseEngine === 'function') { chooseEngine('bd'); } };

  engineButtons.append(hzBtn, dkBtn, bdBtn);

  const extraBtns = document.createElement('footer');
  extraBtns.className = 'engine-buttons-extra';

  const tgBtn = document.createElement('button');
  tgBtn.className = 'telegram-btn';
  tgBtn.onclick = function() { window.open('https://t.me/Habib_Leader_team_11', '_blank'); };
  tgBtn.innerHTML = '<span class="tg-icon">✈️</span> 𝐇𝐚𝐛𝐢𝐛_𝐋𝐞𝐚𝐝𝐚𝐫_𝐭𝐞𝐚𝐦_𝟏𝟏';  
  extraBtns.appendChild(tgBtn);
  engineBox.append(engineTitle, engineButtons, extraBtns);
  choiceContainer.append(headerBox, noticeBox, vipCountdown, engineBox);
  choicePage.appendChild(choiceContainer);
  document.body.appendChild(choicePage);

  // 3. VIP IFRAME
  const vipFrame = document.createElement('iframe');
  vipFrame.id = 'vipFrame';
  document.body.appendChild(vipFrame);

  // 4. LIVE BAR (Extra Slim & Top Positioned)
const liveBar = document.createElement('section');
liveBar.className = 'live-bar';
liveBar.id = 'liveBar';
liveBar.style.position = 'fixed';
liveBar.style.top = '10px'; 
liveBar.style.left = '50%';
liveBar.style.transform = 'translateX(-50%)'; 
liveBar.style.width = '170px'; 
liveBar.style.height = '32px'; 
liveBar.style.zIndex = '10000';

liveBar.innerHTML = `
  <svg class="live-bar-bg" viewBox="0 0 170 32" preserveAspectRatio="none" xmlns="http://w3.org" style="width: 100%; height: 100%; display: block;">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffd700" />
        <stop offset="50%" stop-color="#ffaa00" />
        <stop offset="100%" stop-color="#ffea00" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="168" height="30" rx="8" fill="url(#goldGrad)" stroke="none" />
    <rect x="2" y="2" width="166" height="28" rx="7" fill="#0c0c12" stroke="none" />
  </svg>
  <footer class="live-bar-content" style="display: flex; align-items: center; justify-content: space-between; padding: 0 12px; height: 100%; position: absolute; top: 0; left: 0; width: 100%; box-sizing: border-box; font-family: 'Arial', sans-serif;">
    <div style="display: flex; align-items: center; gap: 5px;">
      <svg class="live-svg-dot" viewBox="0 0 100 100" xmlns="http://w3.org" style="width: 8px; height: 8px;">
        <circle class="pulse-ring" cx="50" cy="50" r="40" fill="none" stroke="#ffaa00" stroke-width="10" />
        <circle class="core-dot" cx="50" cy="50" r="20" fill="#ffaa00" />
      </svg>
      <time id="clock" style="color: #ffffff; font-size: 11px; font-weight: bold; letter-spacing: 0.3px;">00:00:00</time>
    </div>
    <span style="color: #ffffff; font-size: 11px; letter-spacing: 0.3px;">
      𝐋𝐎𝐆𝐎𝐔𝐓
    </span>
    
  </footer>
`;
document.body.appendChild(liveBar);


// 5. FX BOX MODULE
const fxBox = document.createElement('section');
fxBox.className = 'fx-box';
fxBox.id = 'box';

fxBox.innerHTML = 
  '<video autoplay loop muted playsinline preload="auto" x5-playsinline webkit-playsinline class="fx-bg-video" style="display: block !important; visibility: visible !important; opacity: 1 !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; object-fit: cover !important;">' +
    '<source src="https://files.catbox.moe/xok310.mp4" type="video/mp4">' +
    '</video>' +
'<header class="fx-title" id=" style="user-select: text !important; -webkit-user-select: text !important; pointer-events: auto !important;">💥  𝐑𝐀𝐒𝐈𝐘𝐀𝐍 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘 𝐀𝐈 💥</header>' +

  '<article id="fxBody">' +
    '<p class="fx-sub">⚡ WIN GO 30s ⚡</p>' +
    '<p id="rt">20</p>' +
    '<span class="clock-row"></span>' +
    '<span class="realLoader" id="loader"></span>' +
    '<p id="result" class="result">READY</p>' +
    '<figure class="analysis-gap-box">' +
      '<span class="analysis-liner"></span>' +
      '<svg class="live-dot-svg" viewBox="0 0 100 20"><circle class="p-ring" cx="50" cy="10" r="6" /><circle class="c-dot" cx="50" cy="10" r="3" /></svg>' +
    '</figure>' +
    '<time class="period" id="dPeriod"></time>' +
  '</article>';
  
document.body.appendChild(fxBox);

const bgVid = fxBox.querySelector('.fx-bg-video');
if (bgVid) {
  bgVid.muted = true;
  bgVid.defaultMuted = true;
  
  
  const forcePlayVideo = () => {
    bgVid.play().then(() => {
      clearInterval(renderingLoop);
    }).catch(() => {
      
    });
  };
  
  const renderingLoop = setInterval(forcePlayVideo, 50);
  forcePlayVideo();
}
})();

// ================= LIVE 30s PERIOD =================
function pad(n){return String(n).padStart(2,'0');}
(function liveWinGo(){
  const el=document.getElementById("dPeriod");
  const now=new Date(); const utc6=new Date(now.getTime()+6*3600*1000);
  const dayStart=new Date(utc6); dayStart.setUTCHours(6,0,0,0);
  let diffMs=utc6-dayStart;
  let periodIndex=diffMs>=0?Math.floor(diffMs/30000)+1:Math.floor((diffMs+86400000)/30000)+1;
  if(periodIndex<1) periodIndex=1; if(periodIndex>2880) periodIndex=2880;
  const y=utc6.getUTCFullYear(), m=pad(utc6.getUTCMonth()+1), d=pad(utc6.getUTCDate());
  if(el) el.innerText=`${y}${m}${d}-${String(periodIndex).padStart(4,'0')}`;
  const msUntilNext=30000-(utc6.getSeconds()*1000+utc6.getMilliseconds());
  setTimeout(liveWinGo, msUntilNext+5);
})();


/* ================= PASSWORD ================= */
const ADMIN_PASSWORD="zx";
const PASSWORDS = [
  "RHYS_JUL31", "BOTL_AUG03", "SRH_AUG06", "SPAI_AUG09", "HBD_AUG12",
  "RSA_AUG15", "HSY_AUG18", "RHYS_AUG21", "SPAI_AUG24", "BOTL_AUG27",
  "SRH_AUG30", "HBD_SEP02", "RSA_SEP05", "HSY_SEP08", "SPAI_SEP11",
  "RHYS_SEP14", "BOTL_SEP17", "HBD_SEP20", "SRH_SEP23", "RSA_SEP26",
  "HSY_SEP29", "SPAI_OCT02", "RHYS_OCT05", "BOTL_OCT08", "HBD_OCT11",
  "SRH_OCT14", "RSA_OCT17", "HSY_OCT20", "SPAI_OCT23", "RHYS_OCT26"
];


const START_DATE = new Date("2026-07-31T01:30:30").getTime();
const EXPIRY_TIME = 3 * 24 * 60 * 60 * 1000;

function getCurrentPassword(){
  const now=Date.now(), passed=now-START_DATE;
  if(passed<0) return null;
  const index=Math.floor(passed/EXPIRY_TIME);
  if(index>=PASSWORDS.length) return null;
  return PASSWORDS[index];
}

function getRemainingTime(){
  const now=Date.now(), passed=now-START_DATE, index=Math.floor(passed/EXPIRY_TIME);
  if(index>=PASSWORDS.length) return null;
  const elapsed=passed%EXPIRY_TIME;
  const remaining=EXPIRY_TIME-elapsed;
  const d=Math.floor(remaining/(1000*60*60*24));
  const h=Math.floor((remaining%(1000*60*60*24))/(1000*60*60));
  const m=Math.floor((remaining%(1000*60*60))/(1000*60));
  const s=Math.floor((remaining%(1000*60))/1000);
  return `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(() => {
  const timeStr = getRemainingTime();
  
  const element1 = document.getElementById('vipCountdown');
  const element2 = document.getElementById('vipCountdown2');
  
  if(timeStr === null) {
    if(element1) element1.innerText = "VIP EXPIRED";
    if(element2) element2.innerText = "VIP EXPIRED";
  } else {
    if(element1) element1.innerText = `PASSWORD EXPIRED: ${timeStr}`;
    if(element2) element2.innerText = `PASSWORD EXPIRED: ${timeStr}`;
  }
}, 1000);

/* ================= ELEMENTS ================= */
const loginBox = document.getElementById("loginBox");
const unlockBtn = document.getElementById("unlockBtn");
const pass = document.getElementById("pass");
const choicePage = document.getElementById("choicePage");
const vipFrame = document.getElementById("vipFrame");
const liveBar = document.getElementById("liveBar");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const rt = document.getElementById("rt");
const clock = document.getElementById("clock");
const box = document.getElementById("box");
const fxBody = document.getElementById("fxBody");
const fxToggle = document.getElementById("fxToggle");
const vipCountdown = document.getElementById("vipCountdown");

/* ===== DOMAIN LISTS ===== */
const dkDomains = [
  "https://dkwin18.com","https://dkwin20.com"
];
const hzDomains = [
  "https://www.hgnice20.com","https://www.hgnice19.com"
];
const bdDomains = [
  "https://4bdwin24.com","https://11bdwin24.com"
];
let engineDomains = [], enginePath = "", i = 0, retryTimer = null, maxRetries = 10, retries = 0;

/* ================= LOGIN WITH ERROR POPUP ================= */
// POPUP ELEMENTS
const errorPopupHTML = `
  <div id="errorPopup" style="
      display:none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.95);
      padding: 20px 30px;
      border-radius: 22px;
      border: 3px solid #3399ff;
      box-shadow: 0 0 30px rgba(51,153,255,0.4);
      z-index: 999999;
      text-align: center;
      font-family: 'Orbitron', sans-serif;
      width: max-content;
      max-width: 90vw;
      box-sizing: border-box;
      white-space: nowrap;
    ">
    <div style="font-weight:900; font-size:24px; color:#fff; margin-bottom:15px; display:block; white-space:nowrap;">
  ⚠️    INVALID PASSWORD
    </div>
    <button id="errorOkBtn" style="
      padding:6px 20px;
      border:1px solid #3399ff;
      background:rgba(51,153,255,0.1);
      color:#fff;
      font-weight:900;
      font-size:16px;
      cursor:pointer;
      border-radius:11px;
      transition: all 0.2s ease;
      display: inline-block;
    ">OK</button>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', errorPopupHTML);

const errorPopup = document.getElementById('errorPopup');
const errorOkBtn = document.getElementById('errorOkBtn');


/* ================= LOGIN CHECK ================= */
unlockBtn.onclick = function() {
  const input = pass.value;
  const currentPass = getCurrentPassword();

  if(input === ADMIN_PASSWORD || input === currentPass){
    loginBox.style.display = "none";
    choicePage.style.display = "flex";
    speak("rasiyan A i Unloc"); 
  } else {
    // Show popup
    errorPopup.style.display = "block";
    speak("Wrong Password"); 
  }
};


/* ================= OK BUTTON ACTION ================= */
errorOkBtn.onclick = function() {
  location.href = "https://t.me/+w4zmV3g5UoE0ZDU0";
};

/* ================= OPTIONAL: HOVER EFFECT FOR OK ================= */
errorOkBtn.addEventListener('mouseenter', ()=>{ errorOkBtn.style.transform='scale(1.05)'; });
errorOkBtn.addEventListener('mouseleave', ()=>{ errorOkBtn.style.transform='scale(1)'; });

/* ================= CHOOSE ENGINE ================= */
function chooseEngine(type) {
  if (type === "dk") {
    engineDomains = dkDomains;
    enginePath = "/#/register?invitationCode=38661111853";
    speak("dk win selected"); 
  } else if (type === "hz") {
    engineDomains = hzDomains;
    enginePath = "/#/register?invitationCode=23722659488";
    speak("hznice selected"); 
  } else if (type === "bd") {
    engineDomains = bdDomains;
    enginePath = "/#/register?invitationCode=4SQR8RN";
    speak("db win selected"); 
  }

  choicePage.style.display = "none";
  vipFrame.style.display = "block";

  i = Math.floor(Math.random() * engineDomains.length);
  retries = 0;

  loadDomain();
  
  
  setTimeout(() => liveBar.classList.add("show"), 9000);
}


/* ================= LOAD DOMAIN WITH SAFE RETRY ================= */
function loadDomain() {
  if(!vipFrame || engineDomains.length === 0) return;

  vipFrame.src = engineDomains[i] + enginePath;

  if(retryTimer) clearTimeout(retryTimer);

  retryTimer = setTimeout(() => {
    retries++;
    if(retries > maxRetries){
      alert("domains failed ");
      return;
    }
    i = (i + 1) % engineDomains.length;
    loadDomain();
  }, 6000);
}

vipFrame.onload = () => {
  if(retryTimer) clearTimeout(retryTimer);
};

/* ================= VIP COUNTDOWN ================= */
setInterval(() => {
  const remaining = getRemainingTime();
  vipCountdown.textContent = remaining ? `PASSWORD EXPIRED: ${remaining}` : "VIP EXPIRED";
}, 1000);
/* ================= LIVE BAR ================= */
["click","touchend"].forEach(e=>{liveBar.addEventListener(e,()=>location.reload());});

// ==========================================
// ১. গ্লোবাল ভেরিয়েবল এবং কালার অ্যারে ডিক্লেয়ারেশন
// ==========================================
const bigColors = ["#ffb703"];
const smallColors = ["#6FA8F6"];

let stepCount = 1;
let lastPredicted = null;
let winLossStatus = "";
let lastUsedColor = "";
let history = [];
let nextDisplay = "";
let isWaitMode = false;
let hasSpoken = false;
let numHistory = [];
let predictedNumber = "";
let isPredicting = false; 
let lastProcessedSec = -1; 
let lastApiNumber = null; 

// ==========================================
// ২. ইউটিলিটি ফাংশনস (সাউন্ড ও কালার)
// ==========================================
const speak = (t) => {
    if ('speechSynthesis' in window) {
        try {
            window.speechSynthesis.cancel();
            const m = new SpeechSynthesisUtterance(t);
            m.rate = 1.0; 
            window.speechSynthesis.speak(m);
        } catch (e) {
            console.warn("Speech synthesis failed or blocked by browser:", e);
        }
    }
};

const getUniqueColor = (l) => {
    if (!l || l.length === 0) return "#FFFFFF";
    let c; 
    do { 
        c = l[Math.floor(Math.random() * l.length)]; 
    } while (c === lastUsedColor && l.length > 1);
    return lastUsedColor = c;
};

async function syncAndPredict() {
    if (isPredicting) return; 
    isPredicting = true;

    try {
        const res = await fetch("https://www.gajarbotol.site/hack/30.php");
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        const list = json?.data?.data?.list;
        
        if (list && list.number !== undefined) {
            const currentNum = parseInt(list.number);
            
            if (lastApiNumber !== currentNum) {
                lastApiNumber = currentNum; 
                const actual = currentNum >= 5 ? "BIG" : "SMALL";
                
                if (lastPredicted && lastPredicted !== "WAIT") {
                    if (lastPredicted === actual) {
                        winLossStatus = "STP-WIN "; 
                        stepCount = 1; 
                        speak("Congrats! You Win");
                    } else {
                        winLossStatus = "STP-LOS ";
                        speak(`Step loss. Bet now ${Math.pow(2, stepCount)} X`);
                        stepCount = (stepCount >= 9) ? 1 : stepCount + 1;
                    }
                }
                
                history.unshift(actual); 
                numHistory.unshift(currentNum);
                if (history.length > 25) history.pop();
                if (numHistory.length > 25) numHistory.pop();
            }
        }
    } catch (e) { 
        console.error("API Error:", e);
        winLossStatus = "SYNCING.."; 
    }

    if (history.length >= 4) {
        let trendScore = 0; 
        
        let item0 = history.at(0);
        let item1 = history.at(1);
        let item2 = history.at(2);
        let item3 = history.at(3);

        let isDragonMode = (item0 === item1 && item1 === item2 && item2 === item3);
        let isZigZagMode = (item0 !== item1 && item1 !== item2 && item2 !== item3);

        let n0 = numHistory.at(0) || 0;
        let n1 = numHistory.at(1) || 0;
        let n2 = numHistory.at(2) || 0;
        let n3 = numHistory.at(3) || 0;

        let delta1 = n0 - n1;
        let delta2 = n1 - n2;
        let delta3 = n2 - n3;

        let lastSum = n0 + n1;
        let isSumOdd = (lastSum % 2 !== 0);
        let isSumEven = (lastSum % 2 === 0);

        let isHotNumber = [0, 5, 8, 3].includes(n0);
        let isCenterNumber = [4, 5, 6].includes(n0);

        if (isDragonMode) {
            trendScore += item0 === "BIG" ? 7.5 : -7.5;
        } else if (isZigZagMode) {
            trendScore += item0 === "BIG" ? -6.0 : 6.0;
        } else if (isSumOdd && isHotNumber) {
            trendScore += n0 >= 5 ? -4.5 : 4.5;
        } else if (isSumEven && isCenterNumber) {
            trendScore += n0 >= 5 ? 5.0 : -5.0;
        } else {
            let w0 = item0 === "BIG" ? 4 : -4;
            let w1 = item1 === "BIG" ? 2.5 : -2.5;
            let w2 = item2 === "BIG" ? 1.5 : -1.5;
            trendScore += (w0 + w1 + w2);

            if (item0 === item1 && item1 === item2) {
                trendScore += item0 === "BIG" ? 3 : -3;
            } else if (item0 !== item1 && item1 !== item2) {
                trendScore += item0 === "BIG" ? -3 : 3;
            }
        }

        let bigCount = history.filter(x => x === "BIG").length;
        let totalCount = history.length;
        let bigRatio = bigCount / totalCount;
        
        if (bigRatio > 0.56) trendScore -= 2.5;
        if (bigRatio < 0.44) trendScore += 2.5;

        nextDisplay = trendScore >= 0 ? "BIG" : "SMALL";

        let expectedDelta = 0;
        if (isDragonMode) {
            expectedDelta = Math.round((delta1 * 0.7) + (delta2 * 0.3));
        } else if (isZigZagMode) {
            expectedDelta = Math.round((delta1 * -0.6) + (delta2 * -0.4));
        } else if (isSumOdd) {
            expectedDelta = Math.round((delta1 + delta2) / 2) + 1;
        } else {
            expectedDelta = Math.round((delta1 + delta2 + delta3) / 3);
        }
        
        let targetNum = n0 + expectedDelta;
        if (targetNum < 0 || targetNum > 9) {
            targetNum = Math.abs(n0 - expectedDelta) % 10;
        }

                    if (nextDisplay === "BIG") {
            predictedNumber = (targetNum >= 5 && targetNum <= 9) ? targetNum : (Math.floor(Math.random() * 5) + 5);
        } else {
            predictedNumber = (targetNum >= 0 && targetNum <= 4) ? targetNum : Math.floor(Math.random() * 5);
        }

    } else {
        nextDisplay = Math.random() > 0.5 ? "BIG" : "SMALL";
        predictedNumber = nextDisplay === "BIG" ? (Math.floor(Math.random() * 5) + 5) : Math.floor(Math.random() * 5);
    }
    
    isWaitMode = false; 
    hasSpoken = false; 
    isPredicting = false; 
}

// ==========================================
// ৪. ইঞ্জিন এবং রিয়েল-টাইম ৩০ সেকেন্ড অফিশিয়াল টাইমার
// ==========================================
function startEngine() {
    setInterval(() => {
        const now = new Date();
        const currentSec = now.getSeconds();
        
        if (currentSec === lastProcessedSec) return;
        lastProcessedSec = currentSec;

        const totalSec = currentSec % 30; 
        const displaySec = 30 - totalSec;

        const rt = document.getElementById("rt"), 
              clk = document.getElementById("clock"), 
              lb = document.getElementById("liveBar"), 
              ld = document.getElementById("loader"), 
              rs = document.getElementById("result");

        if (lb) {
            if (totalSec >= 10) {
                lb.style.display = "flex"; lb.style.visibility = "visible"; lb.style.opacity = "1";
            } else {
                lb.style.display = "none"; lb.style.visibility = "hidden";
            }
        }

        if (clk) clk.textContent = now.toLocaleTimeString();
        
        if (rt) {
            rt.textContent = displaySec;
            if (displaySec <= 5) {
                rt.style.color = "#FF4136"; 
                rt.style.animation = "timerBlink 0.5s linear infinite";
            } else {
                rt.style.color = "";
                rt.style.animation = "none"; 
            }
        }

        if (displaySec === 28 && !hasSpoken) {
            if (isWaitMode) {
                speak("Please Wait");
                lastPredicted = "WAIT";
            } else {
                speak(`${nextDisplay}, Number ${predictedNumber}`);
                lastPredicted = nextDisplay;
            }
            if (rs) {
                updateUI(rs, lastPredicted);
            }
            hasSpoken = true;
        }

        const isLoading = (displaySec === 30 || displaySec === 29 || displaySec === 1);
        if (ld && rs) { 
            if (isLoading || isPredicting) {
                rs.style.display = "none";
                ld.style.display = "inline-block";
            } else {
                rs.style.display = "inline-block";
                ld.style.display = "none";
            }
        }

        if (totalSec === 0) {
            syncAndPredict();
        }
    }, 1000); 
}

// ==========================================
// ৫. UI DIV
// ==========================================
function updateUI(resDiv, display) {
    if (!resDiv) return;
    const clrList = display === "BIG" ? bigColors : smallColors;
    const clr = (display === "WAIT") ? "#FF4136" : getUniqueColor(clrList);
    
    resDiv.style.fontSize = "25px";
    resDiv.style.fontWeight = "900";
    resDiv.style.fontFamily = "'Cinzel', 'Orbitron', 'Arial', sans-serif";
    resDiv.style.color = clr;
    resDiv.style.filter = "drop-shadow(0 6px 15px rgba(0,0,0,1)) drop-shadow(0 2px 5px rgba(0,0,0,1))";
    resDiv.style.textShadow = "0 0 15px rgba(255,255,255,0.65), 0 0 5px rgba(255,255,255,0.45)";

    resDiv.style.lineHeight = "1.1";
    resDiv.style.display = "inline-block";
    resDiv.style.width = "100%";
    resDiv.style.marginBottom = "12px";
    resDiv.style.marginTop = "10px";
    
    if (display === "WAIT") {
        resDiv.innerHTML = display;
    } else {
        let numColor = '#FFFFFF'; 
        const num = Number(predictedNumber);

        if ([1, 3, 7, 9].includes(num)) {
            numColor = '#00FF00'; 
        } else if ([2, 4, 6, 8].includes(num)) {
            numColor = '#FF0000'; 
        } else if ([0, 5].includes(num)) {
            numColor = '#EE82EE'; 
        }
        
        
        resDiv.innerHTML = `
            <nav style="display: flex; align-items: center; justify-content: center; gap: 10px; background: ${clr}1a; backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); width: fit-content; margin: 0 auto; padding: 2px 6px; border-radius: 6px; border: 1px solid ${clr}33;">
                <span style="display: inline-block; font-family: 'Cinzel', serif;">${display}</span>
                <span style="font-size: 25px; font-weight: 900; color: #00f2fe; opacity: 0.95; display: inline-block; font-family: 'Orbitron', sans-serif;">
                =   <span style="color: ${numColor}; font-size: 24px; font-weight: 900; display: inline-block; font-family: 'Orbitron', sans-serif;">${predictedNumber}</span>
                </span>
            </nav>
        `;
    }


    const statusDiv = document.getElementById('fx-status');
    if (statusDiv) {
        statusDiv.innerHTML = winLossStatus; 
    }
}

// ফার্স্ট গ্লোবাল ইন্টারেকশন অ্যাক্টিভেশন
document.addEventListener('click', () => { 
    speak("System Online");
    const fb = document.querySelector('.fx-box');
    if (fb) {
        const colors = ['#FF3B3B', '#38FF9C', '#3B82FF', '#FACC15', '#FF85FF'];
        let i = 0; 
        setInterval(() => { 
            fb.style.boxShadow = `0 0 30px ${colors[i]}88, 0 0 50px ${colors[i]}44`; 
            i = (i + 1) % colors.length; 
        }, 2800);
    }
}, { once: true });

syncAndPredict(); 
startEngine();

// উইন্ডো এক্সপোজার
window.initPrediction = syncAndPredict;
window.startTimer = startEngine; 
window.syncAndPredict = syncAndPredict;

/* ================= DRAG FX BOX ================= */
let dragging=false,sx=0,sy=0,bx=0,by=0;
function startDrag(x,y){dragging=true;sx=x;sy=y;bx=box.offsetLeft;by=box.offsetTop;}
function moveDrag(x,y){if(!dragging)return;box.style.left=bx+(x-sx)+"px";box.style.top=by+(y-sy)+"px";}
box.addEventListener("mousedown",e=>startDrag(e.clientX,e.clientY));
window.addEventListener("mousemove",e=>moveDrag(e.clientX,e.clientY));
window.addEventListener("mouseup",()=>dragging=false);
box.addEventListener("touchstart",e=>{const t=e.touches[0];startDrag(t.clientX,t.clientY);});
window.addEventListener("touchmove",e=>{const t=e.touches[0];moveDrag(t.clientX,t.clientY);});
window.addEventListener("touchend",()=>dragging=false);

/* ================= MOBILE KEYBOARD ================= */
(function(){
  function fix(){
    const h=window.visualViewport?window.visualViewport.height:window.innerHeight;
    if(h<window.innerHeight*0.75){loginBox.style.alignItems="flex-start";loginBox.style.paddingTop="40px";}
    else{loginBox.style.alignItems="center";loginBox.style.paddingTop="0";}
  }
  fix();
  window.visualViewport?.addEventListener("resize",fix);
  window.addEventListener("resize",fix);
})();

/* ================= iOS SAFARI VIEWPORT ================= */
(function(){
  function setVH(){
    const vh=window.visualViewport?window.visualViewport.height:window.innerHeight;
    document.documentElement.style.setProperty("--vh",vh+"px");
  }
  setVH();
  if(window.visualViewport) window.visualViewport.addEventListener("resize",setVH);
  window.addEventListener("resize",setVH);
})();

(function() {
  // --- ১. প্রিমিয়াম সাইবারপাঙ্ক গ্লোয়িং নিয়ন সিএসএস স্টাইল ইনজেকশন ---
  const style = document.createElement('style');
  style.textContent = `
    /* ফ্লোটিং ড্র্যাগেবল বাটন কন্টেইনার */
    .fx-floating-btn {
      position: fixed !important;
      bottom: 25px !important;
      right: 25px !important;
      width: 58px !important;
      height: 58px !important;
      border-radius: 50% !important;
      cursor: move !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      user-select: none !important;
      touch-action: none !important;
      z-index: 999999999 !important; 
      
      /* ব্যাকগ্রাউন্ডে প্রিমিয়াম সাইবারপাঙ্ক নিয়ন গ্লো এবং ব্রিদিং অ্যানিমেশন */
      background: rgba(10, 15, 26, 0.75) !important;
      box-shadow: 0 0 15px rgba(0, 242, 254, 0.4), 
                  0 0 30px rgba(0, 242, 254, 0.2), 
                  0 10px 25px rgba(0, 0, 0, 0.6) !important;
      border: 1px solid rgba(0, 242, 254, 0.3) !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
      
      animation: buttonPulseGlow 3s ease-in-out infinite alternate !important;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* বাটনের চারপাশে অনবরত ঘুরতে থাকা নিয়ন বর্ডার (Spinning Ring) */
    .fx-floating-btn::before {
      content: '' !important;
      position: absolute !important;
      top: -3px !important;
      left: -3px !important;
      right: -3px !important;
      bottom: -3px !important;
      border-radius: 50% !important;
      background: linear-gradient(0deg, transparent, transparent, #00f2fe, #0072ff) !important;
      z-index: -1 !important;
      animation: neonSpin 2.5s linear infinite !important;
    }
    
    /* ভেতরের গোল ইমেজ মাস্ক (ছবিটি বর্ডারের ভেতরে নিখুঁত গোল হয়ে থাকবে) */
    .fx-floating-btn::after {
      content: '' !important;
      position: absolute !important;
      top: 2px !important;
      left: 2px !important;
      right: 2px !important;
      bottom: 2px !important;
      border-radius: 50% !important;
      background: url('https://i.ibb.co.com/TMhjJF6w/dd1b9427f145e80cde69f0d0f5d9c9ed.jpg') no-repeat;!important;
      background-size: cover !important;
      background-position: center 20% !important;
      border: 2px solid #0d1117 !important;
      z-index: 1 !important;
    }
    
    /* টাচ বা ক্লিক করলে চমৎকার স্কুইশ এবং হাইপার গ্লো এফেক্ট */
    .fx-floating-btn:active {
      transform: scale(0.9) rotate(-5deg) !important;
    }
    .fx-floating-btn:active::before {
      animation: neonSpin 1s linear infinite !important;
    }

    /* --- অ্যানিমেশন কি-ফ্রেমসমূহ --- */
    @keyframes neonSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes buttonPulseGlow {
      0% {
        box-shadow: 0 0 12px rgba(0, 242, 254, 0.4), 0 0 25px rgba(0, 242, 254, 0.2), 0 8px 20px rgba(0, 0, 0, 0.6);
      }
      100% {
        box-shadow: 0 0 22px rgba(0, 242, 254, 0.7), 0 0 45px rgba(0, 242, 254, 0.3), 0 8px 25px rgba(0, 0, 0, 0.7);
      }
    }
  `;
  document.head.appendChild(style);

  const floatBtn = document.createElement('div');
  floatBtn.className = 'fx-floating-btn';
  
  
  floatBtn.style.setProperty('position', 'fixed', 'important');
  floatBtn.style.setProperty('z-index', '9999', 'important');
  floatBtn.style.setProperty('cursor', 'grab', 'important');
  
 
  document.body.appendChild(floatBtn); 

  
  let isDragging = false;
  let hasMoved = false;
  let startX, startY, initialX, initialY;

  function dragStart(e) {
    isDragging = true;
    hasMoved = false;
    
    
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    
    const rect = floatBtn.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    
    floatBtn.style.setProperty('transition', 'none', 'important'); 
    floatBtn.style.setProperty('cursor', 'grabbing', 'important');
  }

  function dragMove(e) {
    if (!isDragging) return;
    
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - startX;
    const dy = clientY - startY;
    
    
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMoved = true;
    }
    
    if (hasMoved) {
      
      if (e.cancelable) e.preventDefault(); 
      
      let newX = initialX + dx;
      let newY = initialY + dy;
      
      const pad = 12;
      newX = Math.max(pad, Math.min(window.innerWidth - floatBtn.offsetWidth - pad, newX));
      newY = Math.max(pad, Math.min(window.innerHeight - floatBtn.offsetHeight - pad, newY));
      
      floatBtn.style.setProperty('left', newX + 'px', 'important');
      floatBtn.style.setProperty('top', newY + 'px', 'important');
      floatBtn.style.setProperty('bottom', 'auto', 'important');
      floatBtn.style.setProperty('right', 'auto', 'important');
    }
  }

  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    floatBtn.style.setProperty('transition', 'transform 0.2s ease, box-shadow 0.3s ease', 'important');
    floatBtn.style.setProperty('cursor', 'grab', 'important');
  }

  
  function handleToggleClick(e) {
    
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    const mainBox = document.getElementById('box');
    if (mainBox) {
      if (mainBox.style.display === 'none' || window.getComputedStyle(mainBox).display === 'none') {
        mainBox.style.setProperty('display', 'block', 'important');
      } else {
        mainBox.style.setProperty('display', 'none', 'important');
      }
    }
  }

  
  floatBtn.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);

  
  floatBtn.addEventListener('touchstart', dragStart, { passive: true });
  document.addEventListener('touchmove', dragMove, { passive: false });
  document.addEventListener('touchend', dragEnd);

  // পিওর ক্লিক লিসেনার
  floatBtn.addEventListener('click', handleToggleClick);

})();



(function() {
    // ==========================================
    // ১. প্রফেশনাল ডোমেন কনফিগারেশন প্যানেল
    // ==========================================
    const CONFIG = {
        totalDurationDays: 30,                 
        expiryDate: "2026-12-30 00:00:00",    
        telegramUsername: "owner_zihad_sir11" 
    };

    const currentDomain = window.location.hostname || "UNKNOWN_DOMAIN.COM";
    const targetTime = new Date(CONFIG.expiryDate).getTime();
    const currentTime = new Date().getTime();

    // মেয়াদ শেষ না হলে মেইন কোড চলতে দেওয়া হবে
    if (currentTime < targetTime) {
        return; 
    }

    // 🚨 মেয়াদ শেষ! পুরনো উইজেট ইনস্ট্যান্ট ডিলিট লজিক
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

                <!-- অ্যাকশন কন্ট্রোল বাটন প্যানেল -->
                <a href="` + baseTelegramUrl + `?text=` + orderMessage + `" target="_blank" class="expire-btn btn-buy">
                    💳 RENEW SUBSCRIPTION NOW
                </a>
                
                <!-- পাশাপাশি বাটন স্লট গ্রিড -->
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

    // ক্যানসেল লজিক
    document.getElementById('fxCancelExpiryBtn')?.addEventListener('click', () => {
        document.body.innerHTML = ""; 
        document.body.style.cssText = "background: #000000 !important; height: 100vh !important; width: 100vw !important; overflow: hidden !important; display: flex !important; align-items: center; justify-content: center;";
        
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


// Domain Lock Code for habib
const myDomain = "rasiyan-nexus-ai.netlify.app"; 
if (window.location.hostname !== myDomain && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    alert("Unauthorized access! This script is protected by habib.");
    document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:50px;'>This is a stolen copy! <br> Please visit the original site: " + myDomain + "</h1>";
    window.location.href = "https://" + myDomain;
}
