import Store from 'electron-store'

interface StoreType {
  documents: Record<string, Document>
  recentsDocuments: Record<string, Document>
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
    recentsDocuments: {}
  }
})
