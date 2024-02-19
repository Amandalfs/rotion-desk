import { MagnifyingGlass } from 'phosphor-react'

import { SearchBar } from '../SearchBar'

export const Search = (): JSX.Element => {
  return (
    <>
      <button className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50">
        <MagnifyingGlass className="w-5 h-5" />
        Search...
      </button>

      <SearchBar />
    </>
  )
}
