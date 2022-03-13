import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/images/logo.PNG'
function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm bg-white navbar-light">
            <NavLink className="navbar-brand" to="/">
                <img src={Logo} alt="logo" />
            </NavLink>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className={(navData) => (navData.isActive ? 'nav-link active-link' : 'nav-link')} to='/'>Currency Convertor</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={(navData) => (navData.isActive ? 'nav-link active-link' : 'nav-link')} to="/history">View Conversion History</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar