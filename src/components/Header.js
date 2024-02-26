import { Link } from "react-router-dom"
import "../styles/Header.css"
import PathConstants from "../routes/pathConstants";

export default function Header() {
    return (
        <header>
            <div className="header-div">
                <h1 className="title"><Link to={PathConstants.HOME}>Event Driven App</Link></h1>
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item"><Link to={PathConstants.TASKMANAGER}>Task Manager</Link></li>
                        <li className="nav-item"><Link to={PathConstants.EMPLOYEEMANAGER}>Employee Manager</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}