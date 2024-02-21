import { Editor } from '@renderer/components/Editor'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export function Document(): JSX.Element {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['document'],
    queryFn: async () => {
      const response = await window.api.fetchDocument({
        id: id ?? ''
      })
      return response.data
    }
  })
  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      <Editor />
    </main>
  )
}
