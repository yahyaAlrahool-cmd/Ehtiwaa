const { app, BrowserWindow, session, shell, ipcMain, clipboard, Menu, webContents } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const PARTS = ['hub', 'wa', 'ig', 'x', 'tt', 'in', 'tg', 'cl'];
const HOSTS = {
  'web.whatsapp.com': 'wa', 'wa.me': 'wa', 'whatsapp.com': 'wa',
  'instagram.com': 'ig', 'x.com': 'x', 'twitter.com': 'x',
  'tiktok.com': 'tt', 'claude.ai': 'cl', 'linkedin.com': 'in',
  'web.telegram.org': 'tg', 't.me': 'tg'
};
function platformOf(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '');
    for (const k in HOSTS) if (h === k || h.endsWith('.' + k)) return HOSTS[k];
  } catch (e) {}
  return null;
}

/* ===== التكبير والتصغير (يُحفظ) ===== */
const PREF = () => path.join(app.getPath('userData'), 'prefs.json');
let Z = 1, LG = 'ar';
try { const P0 = JSON.parse(fs.readFileSync(PREF(), 'utf8')); Z = P0.zoom || 1; LG = P0.lang === 'en' ? 'en' : 'ar'; } catch (e) {}
function savePrefs() { try { fs.writeFileSync(PREF(), JSON.stringify({ zoom: Z, lang: LG })); } catch (e) {} }
function applyZoom() { webContents.getAllWebContents().forEach(w => { try { w.setZoomFactor(Z); } catch (e) {} }); }
function setZ(z) {
  Z = Math.min(2.5, Math.max(0.5, Math.round(z * 10) / 10));
  applyZoom();
  savePrefs();
}
ipcMain.on('zoom', (_e, dir) => setZ(Z + dir * 0.1));
ipcMain.on('lang', (e, l) => {
  if (!e.senderFrame || !String(e.senderFrame.url).startsWith('file:')) return;
  LG = l === 'en' ? 'en' : 'ar'; savePrefs();
  if (win) win.webContents.send('lang', LG);
});
ipcMain.handle('get-lang', () => LG);

/* ===== النشر: تجهيز المنشور داخل تبويب المنصة (تضغط أنت زر النشر) ===== */
const PUB = {
  x:  { url: 'https://x.com/compose/post', text: '[data-testid="tweetTextarea_0"]', file: 'input[data-testid="fileInput"], input[type="file"]' },
  tt: { url: 'https://www.tiktok.com/tiktokstudio/upload', text: 'div[contenteditable="true"]', file: 'input[type="file"]' },
  ig: { url: 'https://www.instagram.com/' },
  in: { url: 'https://www.linkedin.com/feed/' },
  tg: { url: 'https://web.telegram.org/' }
};
const sleep = ms => new Promise(r => setTimeout(r, ms));
function findWc(id) {
  const ses = session.fromPartition('persist:' + id);
  return webContents.getAllWebContents().find(w => w.getType() === 'webview' && w.session === ses);
}
async function waitFor(wc, sel, ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if (await wc.executeJavaScript('!!document.querySelector(' + JSON.stringify(sel) + ')')) return true; } catch (e) {}
    await sleep(700);
  }
  return false;
}
async function setFiles(wc, sel, files) {
  const dbg = wc.debugger; let mine = false;
  try {
    if (!dbg.isAttached()) { dbg.attach('1.3'); mine = true; }
    const { root } = await dbg.sendCommand('DOM.getDocument', { depth: 0 });
    const { nodeId } = await dbg.sendCommand('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
    if (!nodeId) throw new Error('no input');
    await dbg.sendCommand('DOM.setFileInputFiles', { nodeId, files });
  } finally { if (mine) try { dbg.detach(); } catch (e) {} }
}
ipcMain.handle('publish', async (e, d) => {
  try {
    if (!e.senderFrame || !String(e.senderFrame.url).startsWith('file:')) return { ok: false, msg: 'غير مسموح' };
    const cfg = PUB[d.id]; if (!cfg) return { ok: false, msg: 'منصة غير معروفة' };
    const text = String(d.text || ''), files = (d.files || []).filter(f => fs.existsSync(f));
    win.webContents.send('open-tab', { id: d.id, url: cfg.url });
    if (!cfg.text) {   // منصات بدون تعبئة تلقائية: ننسخ النص فقط
      clipboard.writeText(text);
      return { ok: true, msg: 'نُسخ النص: الصقه (Ctrl+V) وأرفق الملفات يدوياً' };
    }
    let wc = null;
    for (let i = 0; i < 30 && !wc; i++) { wc = findWc(d.id); if (!wc) await sleep(500); }
    if (!wc) return { ok: false, msg: 'تعذر فتح التبويب' };
    const sel = files.length ? cfg.file : cfg.text;
    if (!(await waitFor(wc, sel, 30000))) { clipboard.writeText(text); return { ok: false, msg: 'ما ظهرت نافذة النشر (تأكد من تسجيل الدخول). نُسخ النص بدلاً منها' }; }
    if (files.length) { await setFiles(wc, cfg.file, files); await sleep(1500); }
    if (text) {
      if (await waitFor(wc, cfg.text, 20000)) {
        await wc.executeJavaScript('(function(){var e=document.querySelector(' + JSON.stringify(cfg.text) + ');e.focus();document.execCommand("insertText",false,' + JSON.stringify(text) + ')})()');
      } else { clipboard.writeText(text); return { ok: true, msg: 'رُفعت الملفات؛ النص نُسخ، الصقه بنفسك' }; }
    }
    return { ok: true, msg: 'جُهّز المنشور، راجعه واضغط نشر' };
  } catch (err) { return { ok: false, msg: 'تعذر التجهيز: ' + (err.message || err) }; }
});

let win;
function create() {
  const ua = session.defaultSession.getUserAgent()
    .replace(/\sElectron\/\S+/, '').replace(/\sehtiwaa-desktop\/\S+/, '');
  PARTS.forEach(p => session.fromPartition('persist:' + p).setUserAgent(ua));
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1400, height: 900, minWidth: 1000, minHeight: 640,
    backgroundColor: '#02222C', title: 'Ehtiwaa',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), webviewTag: true, contextIsolation: true, nodeIntegration: false }
  });
  win.loadFile('shell.html');
}

app.on('web-contents-created', (_e, wc) => {
  wc.setWindowOpenHandler(({ url }) => {
    const id = platformOf(url);
    if (id && win) win.webContents.send('open-tab', { id, url });
    else if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  wc.on('dom-ready', () => { try { wc.setZoomFactor(Z); } catch (e) {} });
  wc.on('before-input-event', (ev, i) => {
    if (i.type !== 'keyDown' || !(i.control || i.meta)) return;
    if (i.key === '+' || i.key === '=') { setZ(Z + 0.1); ev.preventDefault(); }
    else if (i.key === '-' || i.key === '_') { setZ(Z - 0.1); ev.preventDefault(); }
    else if (i.key === '0') { setZ(1); ev.preventDefault(); }
  });
});

ipcMain.handle('hub-path', () => path.resolve(__dirname, '..', 'hub', 'index.html'));
ipcMain.handle('guest-preload', () => pathToFileURL(path.join(__dirname, 'guest.js')).href);

app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
