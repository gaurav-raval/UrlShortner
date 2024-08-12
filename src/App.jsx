import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Applayout from "./layout/App-layout"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import Link from "./pages/Link"
import RedirectLink from "./pages/RedirectLink"
import urlProvider from "./Context"
import UrlProvider from "./Context"
import RequireAuth from "./components/RequireAuth"

const router = createBrowserRouter(
 [ {
  element :<Applayout/>,
  children :[
{
  path : '/',
  element : <Landing/>   

},{
  path : '/auth',
  element : <Auth/>
},
{
  path : '/dashboard',
  element :( <RequireAuth>
     <Dashboard/>
  </RequireAuth>),
},

{
  path : '/link/:id',
  element :( <RequireAuth>
    <Link/>
  </RequireAuth>)
  
},

{
  path : '/:id',
  element :<RedirectLink/>
},
  ]
  }]
)

function App() {

  return (
<UrlProvider>
<RouterProvider router={router}/>
</UrlProvider>
  )
}

export default App
