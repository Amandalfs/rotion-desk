import {
  Document,
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
    // @ts-ignore
    store.delete(`documents.${id}`)
  }
)

function updateRecentsDocument({ id, title, content }: Document): void {
  store.set(`recentsDocuments.${id}`, {
    id,
    title,
    content
  })
}
const initObjects = store.get<string, Document>('recentsDocuments')
const initDocuments = Object.values(initObjects)

export let listDocuments: any = initDocuments

export function recentDocumentsList(): void {
  const objects = store.get<string, Document>('recentsDocuments')
  const documents = Object.values(objects)
  listDocuments = documents.slice(0, 5)
}
