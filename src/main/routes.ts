import {
  Document,
  DocumentRecent,
  FetchAllDocumentsResponse,
  FetchCreateDocumentResponse,
  FetchDeleteDocumentRequest,
  FetchDocumentResponse,
  FetchSaveDocumentRequest
} from '../shared/types/ipc'
import { ipcMain } from 'electron'
import { store } from './store'
import { randomUUID } from 'node:crypto'
import { IPC } from '../shared/constants/ipc'
import { eventEmitter } from './eventEmitter'

const initObjects = store.get<string, Document>('recentsDocuments')
const initDocuments = Object.values(initObjects)
export let listDocuments: Array<Document> = initDocuments
  .sort((a: DocumentRecent, b: DocumentRecent) => {
    if (!a.open_at || !b.open_at) return 0
    return new Date(b.open_at).getTime() - new Date(a.open_at).getTime()
  })
  .slice(0, 5)

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, async (): Promise<FetchAllDocumentsResponse> => {
  const objects = store.get<string, Document>('documents')
  const documents = Object.values(objects)
  return {
    data: documents
  }
})

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDeleteDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as Document
    updateRecentsDocument(document)
    recentDocumentsList()
    return {
      data: document
    }
  }
)

ipcMain.handle(IPC.DOCUMENTS.CREATE, async (): Promise<FetchCreateDocumentResponse> => {
  const id = randomUUID()

  const document: Document = {
    id,
    title: 'Untitled'
  }
  store.set(`documents.${id}`, document)
  store.set(`recentsDocuments`, {
    ...document
  })
  updateRecentsDocument(document)
  recentDocumentsList()
  return {
    data: document
  }
})

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: FetchSaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content
    })
    updateRecentsDocument({ id, title, content })
    recentDocumentsList()
  }
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: FetchDeleteDocumentRequest): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.delete(`documents.${id}`)
  }
)

function updateRecentsDocument({ id, title, content }: Document): void {
  store.set(`recentsDocuments.${id}`, {
    id,
    title,
    content,
    open_at: new Date()
  })
}

export function recentDocumentsList(): void {
  const objects = store.get<string, DocumentRecent>('recentsDocuments')
  const sortedDocuments = Object.values(objects).sort((a: DocumentRecent, b: DocumentRecent) => {
    if (!a.open_at || !b.open_at) return 0
    return new Date(b.open_at).getTime() - new Date(a.open_at).getTime()
  })
  listDocuments = sortedDocuments.slice(0, 5)
  eventEmitter.emit('update-recent-documents', (): void => {})
}
