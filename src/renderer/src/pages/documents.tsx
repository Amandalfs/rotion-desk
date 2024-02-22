import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Editor } from '../components/Editor'

export function Document(): JSX.Element {
  const { id } = useParams()

  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({
        id: id ?? ''
      })
      return response.data
    }
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }
  }, [data])

  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      {!isFetching && data && <Editor content={initialContent} />}
    </main>
  )
}
