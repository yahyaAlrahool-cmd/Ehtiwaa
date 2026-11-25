// يعمل داخل كل تبويب: تكبير/تصغير بـ Ctrl + العجلة، وللوحة فقط: مسار الملفات والنشر
const { contextBridge, ipcRenderer, webUtils } = require('electron');
addEventListener('wheel', e => {
  if (e.ctrlKey) { e.preventDefault(); ipcRenderer.send('zoom', e.deltaY < 0 ? 1 : -1); }
}, { passive: false });
if (location.protocol === 'file:') {
  contextBridge.exposeInMainWorld('deskHub', {
    pathOf: f => webUtils.getPathForFile(f),
    publish: d => ipcRenderer.invoke('publish', d),
    setLang: l => ipcRenderer.send('lang', l)
  });
}
