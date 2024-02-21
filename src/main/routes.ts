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
  const document: Document[] = Object.values(store.get('documents'))
  console.log(document)
  return {
    data: document
  }
})

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDeleteDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as Document
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
  }
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: FetchDeleteDocumentRequest): Promise<void> => {
    // @ts-ignore
    store.delete(`documents.${id}`)
  }
)
