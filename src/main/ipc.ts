import { FetchAllDocumentsResponse } from '@shared/types/ipc'
import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, async (): Promise<FetchAllDocumentsResponse> => {
  return {
    data: [
      {
        id: '1',
        title: 'Ignite',
        content: ''
      },
      {
        id: '2',
        title: 'Extras',
        content: ''
      },
      {
        id: '3',
        title: 'Nodejs',
        content: ''
      }
    ]
  }
})
