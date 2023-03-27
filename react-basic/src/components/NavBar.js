import {
    Link, NavLink
} from 'react-router-dom';


const NavBar = () => {

    return (
        <nav className="navbar bg-dark navbar-dark" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                <ul className="navbar-nav" style={{ flexDirection: "row" }}>
                    <li className="nav-item me-3">
                        <NavLink
                            activeClassName="active"
                            className="nav-link"
                            aria-current="page"
                            to="/admin">Admin</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            activeClassName="active"
                            className="nav-link"
                            aria-current="page"
                            to="/blogs">Blogs</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default NavBar;
