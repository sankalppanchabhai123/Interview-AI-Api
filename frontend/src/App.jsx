import { RouterProvider } from "react-router"
import { router } from "./app.routers.jsx"
import './App.css'

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App