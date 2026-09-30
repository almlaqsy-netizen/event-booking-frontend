
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function UserDashboard() {

    return (
        <div className="dashboard-layout">

            <Navbar />

            <Sidebar role="user" />

            <main className="dashboard-main">

                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>

                        <p>
                            Welcome back! Manage your events and bookings.
                        </p>
                    </div>
                </div>


                <section className="dashboard-stats">

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            📅
                        </div>

                        <div>
                            <span className="stat-label">
                                Available Events
                            </span>

                            <h2>Events</h2>
                        </div>

                    </div>


                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            🎟️
                        </div>

                        <div>
                            <span className="stat-label">
                                Your Bookings
                            </span>

                            <h2>Bookings</h2>
                        </div>

                    </div>


                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            🔐
                        </div>

                        <div>
                            <span className="stat-label">
                                Account
                            </span>

                            <h2>Secure</h2>
                        </div>

                    </div>

                </section>


                <section className="dashboard-welcome">

                    <div>

                        <h2>
                            Welcome to Event Booking System
                        </h2>

                        <p>
                            You can browse available events, manage your
                            bookings, and update your account settings.
                        </p>

                    </div>


                    <div className="dashboard-actions">

                        <Link
                            to="/user/events"
                            className="dashboard-action primary"
                        >
                            Browse Events
                        </Link>


                        <Link
                            to="/user/bookings"
                            className="dashboard-action secondary"
                        >
                            My Bookings
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default UserDashboard;
