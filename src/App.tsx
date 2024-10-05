import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'

const queryClient = new QueryClient()

function App() {



  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>
    </QueryClientProvider>
  )
}

export default App
