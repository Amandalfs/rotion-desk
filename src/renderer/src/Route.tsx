import { Router, Route } from 'electron-router-dom'
import { Blank } from './pages/blank'
import { Default } from './pages/layouts/Default'

export function Routes(): JSX.Element {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
        </Route>
      }
    />
  )
}
