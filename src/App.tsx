import './App.css'
import Form from './pages/Form'
import SnippetList from './pages/SnippetList'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Form />,
    },
    {
      path: "/list",
      element: <SnippetList />,
    },
  ]);


  return (
    <div className='bg-zinc-800 pb-52 text-white'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
