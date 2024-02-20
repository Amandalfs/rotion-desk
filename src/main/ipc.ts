import { ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async (): Promise<{ id: string; title: string }[]> => {
  return [
    {
      id: '1',
      title: 'Ignite'
    },
    {
      id: '2',
      title: 'Extras'
    },
    {
      id: '3',
      title: 'Nodejs'
    }
  ]
})
