import Store from 'electron-store'
import { StateAppLast } from '../shared/types/ipc'

interface StoreType {
  documents: Record<string, Document>
  recentsDocuments: Record<string, Document>
  stateAppLast: StateAppLast
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
    recentsDocuments: {},
    stateAppLast: {
      type: 'untitled'
    }
  }
})
