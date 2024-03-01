import { Outlet } from 'react-router-dom'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Sidebar } from './../../components/Sidebar/index'
import { Header } from './../../components/Header/index'

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSidebarOpen}
      className="h-screen w-screen bg-rotion-900 text-rotion flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
