import { useRef } from "react";

function Nav() {
    const ulRef = useRef(null);
    console.log("Nav rendered");

    const toggleNav = () => {
        ulRef.current.classList.toggle("d-none");
    }

    return (
        <nav className="card p-4 navbar d-md-block mt-4">
            <div className="container-fluid">
                <button className="btn btn-primary btn-lg w-100" onClick={toggleNav}>Menu</button>
                <div className="w-100">
                    <ul ref={ulRef} className="d-none navbar-nav mt-2 w-100 flex-column">
                        <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/degree" className="nav-link">Degrees</a></li>
                        <li className="nav-item"><a href="/cohort" className="nav-link">Cohorts</a></li>
                        <li className="nav-item"><a href="/module" className="nav-link">Modules</a></li>
                        <li className="nav-item"><a href="/registration" className="nav-link">Register Student</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
