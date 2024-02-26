import "./App.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import routes from "./routes"
import Layout from "./components/Layout"
import Page404 from "./pages/Page404"

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404 />,
      children: routes
    },
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App

// // ./App.js

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom"
// // import Layout from "./components/page"
// // import Home from "./pages/Home"
// // import TaskManager from "./pages/TaskManager"
// // import EmployeeManager from "./pages/EmployeeManager"
// import routes from "./routes"
// import Layout from "./components/Layout"
// import Page404 from "./pages/Page404"

// function App() {
//   const router = createBrowserRouter([
//     {
//       // // parent route component
//       // element: <Layout />,
//       // // child route components
//       // children: [
//       //   { path: "/", element: <Home />, },
//       //   { path: "/task-manager", element: <TaskManager />, },
//       //   { path: "/employee-manager", element: <EmployeeManager />, },
//       // ],
//       element: <Layout />,
//       errorElement: <Page404 />,
//       // specify the routes defined in the
//       // routing layer directly
//       children: routes

//     },
//   ])

//   return (
//       <RouterProvider router={router} />
//   )
// }

// export default App