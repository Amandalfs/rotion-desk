import { useQuery } from '@tanstack/react-query'
import { Command } from 'cmdk'
import { File, MagnifyingGlass } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  isOpen: boolean
  onChangeOpen: (isOpen: boolean) => void
}

export const SearchBar = ({ isOpen, onChangeOpen }: SearchBarProps): JSX.Element => {
  const navigate = useNavigate()
  useEffect(() => {
    const down = (event: KeyboardEvent): void => {
      if (event.key === 'k' && event.ctrlKey) {
        onChangeOpen(!isOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onChangeOpen, isOpen])

  const { data: documents } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await window.api.fetchDocuments()
      return response.data
    }
  })

  function handleOpenDocument(id: string): void {
    onChangeOpen(false)
    navigate(`/document/${id}`)
  }

  return (
    <Command.Dialog
      className="fixed top-24 left-1/2 -translate-x-1/2 w-[480px] max-w-full bg-rotion-800 rounded-md shadow-2xl text-rotion-100 border border-rotion-600"
      label="Search"
      open={isOpen}
      onOpenChange={onChangeOpen}
    >
      <div className="flex items-center gap-2 border-b border-rotion-700 p-4">
        <MagnifyingGlass className="w-5 h-5" />
        <Command.Input
          autoFocus
          placeholder="Search pages..."
          className="w-full bg-transparent focus:outline-none text-sm text-rotion-50 placeholder:text-rotion-200"
        />
      </div>
      <Command.List className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800 overflow-y-auto">
        <Command.Empty className="py-3 px-4 text-rotion-200 text-sm">
          No page was found.
        </Command.Empty>

        {documents &&
          documents.map((documentList) => (
            <Command.Item
              key={documentList.id}
              onSelect={() => handleOpenDocument(documentList.id)}
              className="py-3 px-4 text-rotion-50 text-sm flex items-center gap-2 hover:bg-rotion-700 aria-selected:!bg-rotion-600"
            >
              <File className="w-4 h-4" />
              {documentList.title}
            </Command.Item>
          ))}
      </Command.List>
    </Command.Dialog>
  )
}
