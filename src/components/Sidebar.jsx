import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ role }) {

    const [showLogs, setShowLogs] = useState(false);

    return (
        <aside className="sidebar">

            <h2>Menu</h2>


            {role === "user" && (

                <nav>

                    <Link to="/user/UserDashboard">
                        Dashboard
                    </Link>

                    <Link to="/user/events">
                        Events
                    </Link>

                    <Link to="/user/bookings">
                        My Bookings
                    </Link>

                    <Link to="/user/change-password">
                        Change Password
                    </Link>

                </nav>

            )}


            {role === "admin" && (

                <nav>

                    <Link to="/admin/AdminDashboard">
                        Dashboard
                    </Link>

                    <Link to="/admin/events">
                        Events
                    </Link>

                    <Link to="/admin/participants">
                        Events Participants
                    </Link>


                    <button
                        onClick={() => setShowLogs(!showLogs)}
                    >
                        Logs {showLogs ? "▲" : "▼"}
                    </button>


                    {showLogs && (

                        <div>

                            <Link to="/admin/logs/events">
                                Event Logs
                            </Link>

                            <Link to="/admin/logs/bookings">
                                Booking Logs
                            </Link>

                            <Link to="/admin/logs/logins">
                                Login Logs
                            </Link>

                        </div>

                    )}

                </nav>

            )}

        </aside>
    );
}

export default Sidebar;