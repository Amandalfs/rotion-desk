// import * as Collapsible from '@radix-ui/react-collapsible'
import { CaretDoubleLeft } from 'phosphor-react'
import clsx from 'clsx'

import * as Navigation from './Navigation'
import { CreatePage } from './CreatePage'
import { Profile } from './Profile'
import { Search } from './Search'

export function Sidebar(): JSX.Element {
  const isMacOS = undefined

  return (
    <>
      <div
        className={clsx('region-drag h-14', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      ></div>

      <div
        className={clsx(
          'flex-1 flex flex-col gap-8 h-full w-[240px] group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 transition-opacity duration-200',
          {
            'pt-6': !isMacOS
          }
        )}
      >
        <Profile />
        <Search />

        <Navigation.Root>
          <Navigation.Section>
            <Navigation.SectionTitle>Workspace</Navigation.SectionTitle>
            <Navigation.SectionContent>
              <Navigation.Link to="/id">Titulo</Navigation.Link>
            </Navigation.SectionContent>
          </Navigation.Section>
        </Navigation.Root>

        <CreatePage />
      </div>
    </>
  )
}
