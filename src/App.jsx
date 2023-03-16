import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import NotFound from './pages/404'
import Project from './pages/Project'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        {/* possible to add a layout */}
      </>
    ),
  },
  {
    path: "project/:id",
    element: (
      <>
        <Header />
        <Project />
      </>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_BACKEND_URL}`,
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </>
  )
}

export default App
