// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../api/axios";

// export default function Logs() {

//     const { type } = useParams();

//     const [logs, setLogs] = useState([]);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {

//         async function fetchLogs() {

//             setLoading(true);
//             setError("");

//             try {

//                 const response = await api.get(`/admin/logs/${type}`);

//                 setLogs(response.data.logs);

//             } catch (error) {

//                 setError(
//                     error.response?.data?.message ||
//                     "Failed to fetch logs"
//                 );

//             } finally {

//                 setLoading(false);

//             }
//         }

//         fetchLogs();

//     }, [type]);


//     if (loading) {
//         return <p>Loading logs...</p>;
//     }


//     if (error) {
//         return <p>{error}</p>;
//     }


//     return (
//         <div>

//             <h1>
//                 {type === "events" && "Event Logs"}
//                 {type === "bookings" && "Booking Logs"}
//                 {type === "logins" && "Login Logs"}
//             </h1>


//             {logs.length === 0 ? (

//                 <p>No logs available.</p>

//             ) : (

//                 <table>

//                     <thead>

//                         <tr>

//                             <th>ID</th>

//                             {type === "events" && (
//                                 <>
//                                     <th>Event</th>
//                                     <th>Performed By</th>
//                                     <th>Action</th>
//                                     <th>Description</th>
//                                     <th>Created At</th>
//                                 </>
//                             )}


//                             {type === "bookings" && (
//                                 <>
//                                     <th>Booking ID</th>
//                                     <th>Event</th>
//                                     <th>User</th>
//                                     <th>Action</th>
//                                     <th>Description</th>
//                                     <th>Created At</th>
//                                 </>
//                             )}


//                             {type === "logins" && (
//                                 <>
//                                     <th>User</th>
//                                     <th>Email Attempted</th>
//                                     <th>Action</th>
//                                     <th>Created At</th>
//                                 </>
//                             )}

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {logs.map((log) => (

//                             <tr key={log.id}>

//                                 <td>{log.id}</td>


//                                 {/* EVENT LOGS */}

//                                 {type === "events" && (
//                                     <>
//                                         <td>
//                                             {log.event?.title || "N/A"}
//                                         </td>

//                                         <td>
//                                             {log.performer?.full_name || "N/A"}
//                                         </td>

//                                         <td>
//                                             {log.action}
//                                         </td>

//                                         <td>
//                                             {log.description}
//                                         </td>

//                                         <td>
//                                             {log.created_at}
//                                         </td>
//                                     </>
//                                 )}


//                                 {/* BOOKING LOGS */}

//                                 {type === "bookings" && (
//                                     <>
//                                         <td>
//                                             {log.booking_id}
//                                         </td>

//                                         <td>
//                                             {log.event?.title || "N/A"}
//                                         </td>

//                                         <td>
//                                             {log.user?.full_name || "N/A"}
//                                         </td>

//                                         <td>
//                                             {log.action}
//                                         </td>

//                                         <td>
//                                             {log.description}
//                                         </td>

//                                         <td>
//                                             {log.created_at}
//                                         </td>
//                                     </>
//                                 )}


//                                 {/* LOGIN LOGS */}

//                                 {type === "logins" && (
//                                     <>
//                                         <td>
//                                             {log.user?.full_name || "Unknown"}
//                                         </td>

//                                         <td>
//                                             {log.email_attempted}
//                                         </td>

//                                         <td>
//                                             {log.action}
//                                         </td>

//                                         <td>
//                                             {log.created_at}
//                                         </td>
//                                     </>
//                                 )}

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             )}

//         </div>
//     );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/admin.css";

export default function Logs() {

    const { type } = useParams();

    const [logs, setLogs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchLogs() {

            setLoading(true);
            setError("");

            try {

                const response = await api.get(
                    `/admin/logs/${type}`
                );

                setLogs(response.data.logs);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch logs"
                );

            } finally {

                setLoading(false);

            }
        }

        fetchLogs();

    }, [type]);

    function formatDate(date) {

    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}
    function getTitle() {

        if (type === "events") {
            return "Event Logs";
        }

        if (type === "bookings") {
            return "Booking Logs";
        }

        if (type === "logins") {
            return "Login Logs";
        }

        return "System Logs";
    }


    if (loading) {

        return (
            <div className="admin-layout">
                <Navbar />
                <Sidebar role="admin" />

                <main className="admin-main">
                    <div className="admin-loading">
                        Loading logs...
                    </div>
                </main>
            </div>
        );

    }


    if (error) {

        return (
            <div className="admin-layout">
                <Navbar />
                <Sidebar role="admin" />

                <main className="admin-main">
                    <div className="admin-error-message">
                        {error}
                    </div>
                </main>
            </div>
        );

    }


    return (
        <div className="admin-layout">

            <Navbar />

            <Sidebar role="admin" />

            <main className="admin-main">

                <div className="admin-header">
                    <div>
                        <h1>{getTitle()}</h1>
                        <p>
                            Review system activity and recorded actions.
                        </p>
                    </div>
                </div>

                <section className="admin-table-card">

                    {logs.length === 0 ? (

                        <div className="admin-empty-state">
                            <div>📋</div>
                            <h3>No logs available</h3>
                            <p>
                                There are no records available for this
                                category.
                            </p>
                        </div>

                    ) : (

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        {type === "events" && (
                                            <>
                                                <th>Event</th>
                                                <th>Performed By</th>
                                                <th>Action</th>
                                                <th>Description</th>
                                                <th>Created At</th>
                                            </>
                                        )}

                                        {type === "bookings" && (
                                            <>
                                                <th>Booking ID</th>
                                                <th>Event</th>
                                                <th>User</th>
                                                <th>Action</th>
                                                <th>Description</th>
                                                <th>Created At</th>
                                            </>
                                        )}

                                        {type === "logins" && (
                                            <>
                                                <th>User</th>
                                                <th>Email Attempted</th>
                                                <th>Action</th>
                                                <th>Created At</th>
                                            </>
                                        )}

                                    </tr>

                                </thead>

                                <tbody>

                                    {logs.map((log) => (

                                        <tr key={log.id}>

                                            <td>{log.id}</td>

                                            {type === "events" && (
                                                <>
                                                    <td>
                                                        {log.event?.title || "N/A"}
                                                    </td>

                                                    <td>
                                                        {log.performer?.full_name || "N/A"}
                                                    </td>

                                                    <td>
                                                        <span className="log-action">
                                                            {log.action}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {log.description}
                                                    </td>

                                                    <td>
                                                        {formatDate(log.created_at)}
                                                    </td>
                                                </>
                                            )}

                                            {type === "bookings" && (
                                                <>
                                                    <td>
                                                        {log.booking_id}
                                                    </td>

                                                    <td>
                                                        {log.event?.title || "N/A"}
                                                    </td>

                                                    <td>
                                                        {log.user?.full_name || "N/A"}
                                                    </td>

                                                    <td>
                                                        <span className="log-action">
                                                            {log.action}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {log.description}
                                                    </td>

                                                    <td>
                                                        {formatDate(log.created_at)}
                                                    </td>
                                                </>
                                            )}

                                            {type === "logins" && (
                                                <>
                                                    <td>
                                                        {log.user?.full_name || "Unknown"}
                                                    </td>

                                                    <td>
                                                        {log.email_attempted}
                                                    </td>

                                                    <td>
                                                        <span className="log-action">
                                                            {log.action}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {formatDate(log.created_at)}
                                                    </td>
                                                </>
                                            )}

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </main>
        </div>
    );
}
