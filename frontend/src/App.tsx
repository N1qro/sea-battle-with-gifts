import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<Home/>} />

    <Route path="register" element={<Signup/>} />
    <Route path="login" element={<Login/>} />
    <Route path="about" />

    <Route path="profile">
      <Route index />
      <Route path="history" />
      <Route path="invitations" />
    </Route>
  </Route>
))

function App() {
  return <RouterProvider router={router}/>
}

export default App