import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'
import { listDocuments } from './routes'
const EventEmitter = require('events')

export function createTray(window: BrowserWindow): {
  menu: Menu
  updateMenuRecentsDocuments: () => void
} {
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
    {
      label: 'documentos recentes'
    },
    ...listDocuments.map(({ title, id }) => ({
      label: title,
      click: (): void => {
        window.webContents.send('load-document', { id })
      }
    })),
    { type: 'separator' },
    { label: 'Sair', role: 'quit' }
  ])

  tray.setToolTip('Rotion')
  tray.setContextMenu(menu)

  const eventEmitter = new EventEmitter()

  function updateMenuRecentsDocuments(): void {
    const menuUpdate = Menu.buildFromTemplate([
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
      {
        label: 'documentos recentes'
      },
      ...listDocuments.map(({ title, id }) => ({
        label: title,
        click: (): void => {
          window.webContents.send('load-document', { id })
        }
      })),
      { type: 'separator' },
      { label: 'Sair', role: 'quit' }
    ])
    tray.setContextMenu(menuUpdate)
  }

  eventEmitter.on('update-recent-documents', () => {
    console.log('evenv')
    updateMenuRecentsDocuments()
  })

  return {
    updateMenuRecentsDocuments,
    menu
  }
}
