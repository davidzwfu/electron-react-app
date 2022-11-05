import { contextBridge, ipcRenderer } from 'electron';

export type ContextBridgeApi = {
  login: (args: {}) => Promise<any>,
  logout: () => Promise<any>,
  readFile: () => Promise<any>,
  updateFile: (args: {}) => Promise<any>
}

contextBridge.exposeInMainWorld('api', {
  login: (args: { email: string, password: string }) => ipcRenderer.invoke('login', args),
  logout: () => ipcRenderer.invoke('logout'),
  readFile: () => ipcRenderer.invoke('readFile'),
  updateFile: (args: { content: string }) => ipcRenderer.invoke('updateFile', args),
})
