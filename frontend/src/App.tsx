import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<Home/>} />
  </Route>
))

function App() {
  return <RouterProvider router={router}/>
}

export default App