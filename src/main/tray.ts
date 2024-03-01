import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'
import { listDocuments } from './routes'

export function createTray(window: BrowserWindow): void {
  const tray = new Tray(path.resolve(__dirname, '../../resources/rotionTemplate.png'))

  const menu = Menu.buildFromTemplate([
    { label: 'rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: (): void => {
        window.webContents.send('new-document', { 'hello world': '' })
      },
      accelerator: 'CommandOrControl+1'
    },
    { type: 'separator' },
    {
      label: 'documentos recentes',
      submenu: listDocuments.map(({ title, id }) => ({
        label: title,
        click: (): void => {
          window.webContents.send('load-document', { id })
        }
      }))
    },
    { type: 'separator' },
    { label: 'Sair', role: 'quit' }
  ])

  tray.setToolTip('Rotion')
  tray.setContextMenu(menu)
}
