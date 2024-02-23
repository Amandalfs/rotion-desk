import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Document } from '~/src/shared/types/ipc'

export const CreatePage = (): JSX.Element => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: createDocument, isPending: isCreatingNewDocument } = useMutation({
    mutationFn: async () => {
      const response = await window.api.createDocument()
      return response.data
    },
    onSuccess: async (newDocument) => {
      queryClient.setQueriesData(
        {
          queryKey: ['documents']
        },
        (documents: Document[] | undefined) => {
          if (documents && documents?.length >= 0) {
            return [...documents, newDocument]
          }
          return [newDocument]
        }
      )
      navigate(`/document/${newDocument.id}`)
    }
  })

  useEffect(() => {
    function onNewDocument(): void {
      createDocument()
    }
    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createDocument])

  return (
    <button
      onClick={() => {
        createDocument()
      }}
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Create new page
    </button>
  )
}
