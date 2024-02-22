import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Editor, OnContentUpdateParams } from '../components/Editor'
import { Document as DocumentType } from '~/src/shared/types/ipc'

export function Document(): JSX.Element {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({
        id: id ?? ''
      })
      return response.data
    }
  })

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: OnContentUpdateParams) => {
      await window.api.saveDocument({ id: id!, title, content })
    },
    onSuccess: (_, { title }) => {
      queryClient.setQueriesData(
        {
          queryKey: ['documents']
        },
        (documents: DocumentType[] | undefined) => {
          if (documents) {
            return documents?.map((document) => {
              if (document.id === id) {
                return {
                  ...document,
                  title
                }
              } else {
                return document
              }
            })
          }
        }
      )
    }
  })

  const handleEditorContentUpdate = ({ title, content }: OnContentUpdateParams): void => {
    saveDocument({ title, content })
  }

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }
  }, [data])

  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      {!isFetching && data && (
        <Editor content={initialContent} onContentUpdate={handleEditorContentUpdate} />
      )}
    </main>
  )
}
