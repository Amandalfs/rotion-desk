import { FetchAllDocumentsResponse } from '@shared/types/ipc'
import { IPC } from '../shared/constants/ipc'
import {
  FetchDocumentRequest,
  FetchDocumentResponse,
  FetchCreateDocumentResponse,
  FetchSaveDocumentRequest,
  FetchDeleteDocumentRequest
} from '../shared/types/ipc'
import { ipcRenderer } from 'electron'

export const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL)
  },

  fetchDocument(req: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req)
  },

  createDocument(): Promise<FetchCreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },

  saveDocument(req: FetchSaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  },

  deleteDocument(req: FetchDeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  }
}
