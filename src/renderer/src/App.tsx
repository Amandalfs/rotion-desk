import { QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './Route'
import './styles/global.css'
import { queryClient } from './lib/reactQuery'

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
