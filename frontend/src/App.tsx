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
import RequireAuth from './layouts/requireAuth'
import ProfileLayout from './layouts/ProfileLayout'


// loaders
import { loader as ProfileLoader } from './layouts/ProfileLayout'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<Home/>} />

    <Route path="register" element={<Signup/>} />
    <Route path="login" element={<Login/>} />
    <Route path="about" />

    <Route element={<RequireAuth />}>
      <Route path="profile" element={<ProfileLayout />} loader={ProfileLoader}>
        <Route index />
        <Route path="history" />
        <Route path="invitations" />
      </Route>
    </Route>
  </Route>
))

function App() {
  return <RouterProvider router={router}/>
}

export default App