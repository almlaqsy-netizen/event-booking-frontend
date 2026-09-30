import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );


    // Apply theme
    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem("theme", theme);

    }, [theme]);


    function handleThemeToggle() {

        setTheme(
            theme === "light"
                ? "dark"
                : "light"
        );

    }


    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    }


    return (
        <nav className="navbar">

            <div className="navbar-logo">
                Event Booking System
            </div>


            <div className="navbar-user">

                <span>
                    {role === "admin" ? "Admin" : "User"}
                </span>


                <button
                    className="theme-button"
                    onClick={handleThemeToggle}
                    aria-label="Toggle theme"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>


                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;
