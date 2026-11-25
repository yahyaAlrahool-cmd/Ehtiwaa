const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desk', {
  hubPath: () => ipcRenderer.invoke('hub-path'),
  guestPreload: () => ipcRenderer.invoke('guest-preload'),
  onOpen: cb => ipcRenderer.on('open-tab', (_e, d) => cb(d)),
  getLang: () => ipcRenderer.invoke('get-lang'),
  onLang: cb => ipcRenderer.on('lang', (_e, l) => cb(l))
});
