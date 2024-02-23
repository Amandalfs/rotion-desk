import { api } from './api'
declare global {
  export interface Window {
    api: typeof api
  }
}
