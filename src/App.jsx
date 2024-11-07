import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Home from "./components/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><Outlet /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
