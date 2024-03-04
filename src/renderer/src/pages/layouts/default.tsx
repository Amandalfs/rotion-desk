import { Outlet, useNavigate } from 'react-router-dom'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Sidebar } from './../../components/Sidebar/index'
import { Header } from './../../components/Header/index'
import { useQuery } from '@tanstack/react-query'

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const navigate = useNavigate()

  useQuery({
    queryFn: async () => {
      const { data } = await window.api.fetchGetStateAppLast()
      if (data.type === 'document') navigate(`/document/${data.id}`)
      return data
    },
    queryKey: ['StateAppLast'],
    staleTime: Infinity
  })

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
