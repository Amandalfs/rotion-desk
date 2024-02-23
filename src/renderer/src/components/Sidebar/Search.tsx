import { MagnifyingGlass } from 'phosphor-react'

import { SearchBar } from '../SearchBar'
import { useState } from 'react'

export const Search = (): JSX.Element => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false)

  function toggleSearchBar(isOpen: boolean): void {
    setIsSearchBarOpen(isOpen)
  }
  return (
    <>
      <button className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50">
        <MagnifyingGlass className="w-5 h-5" />
        Search...
      </button>

      <SearchBar isOpen={isSearchBarOpen} onChangeOpen={toggleSearchBar} />
    </>
  )
}
