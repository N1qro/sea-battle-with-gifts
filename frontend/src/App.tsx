import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

// Layouts
import RootLayout from './layouts/RootLayout'
import RequireAuth from './layouts/requireAuth'
import ProfileLayout from './layouts/ProfileLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProfileIndex from './pages/profile/Index'

// Loaders
import { loader as ProfileLoader } from './layouts/ProfileLayout'
import { loader as PrizesLoader } from './pages/profile/Index'

// Context
import { AuthContext } from './context/AuthContext'
import useAuth from './hooks/useAuth'
import { useState } from 'react'
import { User } from './types/general'


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<Home/>} />

    <Route path="register" element={<Signup/>} />
    <Route path="login" element={<Login/>} />
    <Route path="about" />

    <Route element={<RequireAuth />}>
      <Route path="profile" element={<ProfileLayout />} loader={ProfileLoader}>
        <Route index element={<ProfileIndex/>} loader={PrizesLoader} />
        <Route path="history" />
        <Route path="invitations" />
      </Route>
    </Route>
  </Route>
))

function App() {
  const [ user, setUser ] = useState<User | null>(null)

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <RouterProvider router={router}/>
    </AuthContext.Provider>
  )
}

export default App