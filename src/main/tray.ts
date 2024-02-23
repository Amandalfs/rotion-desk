import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

export function createTray(window: BrowserWindow): void {
  const tray = new Tray(path.resolve(__dirname, '../../resources/rotionTemplate.png'))

  const menu = Menu.buildFromTemplate([
    { label: 'rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: (): void => {
        window.webContents.send('new-document')
      },
      accelerator: 'CommandOrControl+1'
    },
    { type: 'separator' },
    { label: 'documentos recentes', enabled: false },
    { label: 'documento backennd', click: (): void => {} },
    { label: 'documento fronend', click: (): void => {} },
    { label: 'documento java', click: (): void => {} },
    { type: 'separator' },
    { label: 'Sair', role: 'quit' }
  ])

  tray.setToolTip('Rotion')
  tray.setContextMenu(menu)
}
