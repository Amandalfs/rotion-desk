import { Header } from '@renderer/components/Header'
import { Sidebar } from '@renderer/components/Sidebar'
import { Outlet } from 'react-router-dom'

export function Default(): JSX.Element {
  return (
    <div className="h-screen w-screen bg-rotion-900 text-rotion flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={true} />
        <Outlet />
      </div>
    </div>
  )
}
