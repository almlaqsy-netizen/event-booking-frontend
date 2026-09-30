// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";

// function AdminDashboard() {

//     return (
//         <div>

//             <Navbar />

//             <Sidebar role="admin" />

//             <main>

//                 <h1>Admin Dashboard</h1>

//                 <h2>Welcome Admin</h2>

//                 <p>
//                     Manage events, participants and system logs.
//                 </p>

//             </main>

//         </div>
//     );
// }

// export default AdminDashboard;


import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

function AdminDashboard() {
    return (
        <div className="admin-layout">
            <Navbar />

            <Sidebar role="admin" />

            <main className="admin-main">

                <div className="admin-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>
                            Manage events, participants, and system logs.
                        </p>
                    </div>
                </div>

                <section className="admin-stats">

                    <div className="admin-stat-card">
                        <div className="admin-stat-icon">📅</div>

                        <div>
                            <span>Events</span>
                            <h2>Manage Events</h2>
                        </div>
                    </div>

                    <div className="admin-stat-card">
                        <div className="admin-stat-icon">👥</div>

                        <div>
                            <span>Participants</span>
                            <h2>View Participants</h2>
                        </div>
                    </div>

                    <div className="admin-stat-card">
                        <div className="admin-stat-icon">📋</div>

                        <div>
                            <span>System Logs</span>
                            <h2>View Logs</h2>
                        </div>
                    </div>

                </section>

                <section className="admin-welcome">

                    <div>
                        <h2>Welcome, Admin</h2>

                        <p>
                            Use the administration panel to create and manage
                            events, monitor participants, and review system
                            activity.
                        </p>
                    </div>

                    <div className="admin-actions">

                        <Link
                            to="/admin/create-event"
                            className="admin-action primary"
                        >
                            Create Event
                        </Link>

                        <Link
                            to="/admin/events"
                            className="admin-action secondary"
                        >
                            Manage Events
                        </Link>

                    </div>

                </section>

            </main>
        </div>
    );
}

export default AdminDashboard;
