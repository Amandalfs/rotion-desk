import { ReactNode } from 'react'

type SectionContentProps = {
  children: ReactNode
}

export const SectionContent = (props: SectionContentProps): JSX.Element => {
  return <div className="flex flex-col gap-px" {...props} />
}
