import {
    Link, NavLink
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from "../store/authSlice";

const NavBar = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    return (
        <nav className="navbar bg-dark navbar-dark" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                <ul className="navbar-nav" style={{ flexDirection: "row" }}>
                    <li className="nav-item me-3">
                        <button
                            className="text-white btn btn-link text-decoration-none"
                            onClick={() => {
                                if (isLoggedIn) {
                                    dispatch(logout());
                                } else {
                                    dispatch(login());
                                }
                            }}
                        >
                            {isLoggedIn ? "loginOut" : "Login"}
                        </button>
                    </li>
                    {isLoggedIn ?
                        <li className="nav-item me-3">
                            <NavLink
                                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                aria-current="page"
                                to="/admin">Admin</NavLink>
                        </li>
                        :
                        null
                    }
                    <li className="nav-item">
                        <NavLink
                            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                            aria-current="page"
                            to="/blogs">Blogs</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default NavBar;
