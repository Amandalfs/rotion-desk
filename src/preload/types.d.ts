import { api } from './api'
declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}
