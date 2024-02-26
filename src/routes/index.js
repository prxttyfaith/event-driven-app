// ./src/routes/index.js

import React from "react"
import PathConstants from "./pathConstants"

const Home = React.lazy(() => import("../pages/Home"))
// other page components...
const TaskManager = React.lazy(() => import("../pages/TaskManager.js"))
const EmployeeManager = React.lazy(() => import("../pages/EmployeeManager"))

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    // other mappings ...
    { path: PathConstants.TASKMANAGER, element: <TaskManager /> },
    { path: PathConstants.EMPLOYEEMANAGER, element: <EmployeeManager /> },
]

export default routes