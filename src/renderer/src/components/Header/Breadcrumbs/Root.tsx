import { ReactNode } from 'react'

type RootProps = {
  children: ReactNode
}

export const Root = (props: RootProps): JSX.Element => {
  return (
    <div className="flex-1 overflow-hidden flex items-center">
      <div className="inline-flex gap-2 text-sm text-rotion-100 items-center whitespace-nowrap region-no-drag">
        {props.children}
      </div>
    </div>
  )
}
