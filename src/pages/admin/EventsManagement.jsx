// import { useState,useEffect } from "react"
// import api from "../../api/axios";
// import { Link } from "react-router-dom";
// export default function EventsManagement(){
//     const [events,setEvents]=useState([])
//     // summary
//     const [active,setActive]=useState("")
//     const [registration_closed,setRegistration_closed]=useState("")
//     const [ended,setEnded]=useState("")
//     const [cancelled,setCancelled]=useState("")

//     const [error,setError]=useState("")
//     const [loading,setLoading]=useState(true)

//     const[message,setMessage]=useState("")

// useEffect(()=>{

// async function index() {
//     try{
//         const response=await api.get('/admin/events')

//         setEvents(response.data.events)

//         setActive(response.data.summary.active)
//         setRegistration_closed(response.data.summary.registration_closed)
//         setEnded(response.data.summary.ended)
//         setCancelled(response.data.summary.cancelled)
        
//     }

// catch(error){
//  setError(error.response?.data?.message)
// }
// finally{
//     setLoading(false)
// }

// }
// index()
// },[]);   

// if(loading)
//     return <p>loading...</p>

// if(error)
//     return <p>{error}</p>

// async function cancel(id) {
//     try{
//     const response=await api.patch(`/admin/events/${id}/cancel`)
//     setMessage(response.data.message)
//     }
//     catch(error){
//         setError(error.response?.data?.message)
//     }
// }

//     return(
//         <div>
//             <Link to="/admin/create-event">
//                 <button>Create new event</button>
//             </Link>
//             <div>
//                 <h1>summary</h1>
//                 <p>active evets:{active}</p>
//                 <p>registration_closed events:{registration_closed}</p>
//                 <p>ended events:{ended}</p>
//                 <p>cancelled events:{cancelled}</p>
//             </div>
//          {message&& <p>{message}</p>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Location</th>
//                         <th>Event start at</th>
//                         <th>Event end at</th>
//                         <th>Registration deadline</th>
//                         <th>Total seats</th>
//                         <th>Available seats</th>
//                         <th>Price</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>


//                 <tbody>
//                     {events.map((event)=>(
                        
//                         <tr key={event.id}>
//                             <td>
//                                 {event.title}
//                             </td>
//                             <td>
//                                 {event.description}
//                             </td>
//                             <td>
//                                 {event.location}
//                             </td>
//                             <td>
//                                 {event.event_start_at}
//                             </td>
//                             <td>
//                                 {event.event_end_at}
//                             </td>
//                             <td>
//                                 {event.registration_deadline}
//                             </td>
//                             <td>
//                                 {event.total_seats}
//                             </td>
//                             <td>
//                                 {event.available_seats}
//                             </td>
//                             <td>
//                                 {event.price}
//                             </td>
//                             <td>
//                                 <button onClick={()=>{cancel(event.id)}}>cancel event</button> <br />
//                             </td>
//                         </tr>   
//                     ))}
//                 </tbody>
//             </table>

//         </div>

//     )
// }



import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/admin.css";

export default function EventsManagement() {
    const [events, setEvents] = useState([]);

    const [active, setActive] = useState("");
    const [registration_closed, setRegistration_closed] = useState("");
    const [ended, setEnded] = useState("");
    const [cancelled, setCancelled] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

 
async function fetchEvents() {
    try {
        setLoading(true);
        setError("");

        const response = await api.get("/admin/events");

        setEvents(response.data.events);
        setActive(response.data.summary.active);
        setRegistration_closed(
            response.data.summary.registration_closed
        );
        setEnded(response.data.summary.ended);
        setCancelled(response.data.summary.cancelled);

    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Failed to fetch events"
        );
    } finally {
        setLoading(false);
    }
}
function formatDate(date) {

    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}
useEffect(() => {
    fetchEvents();
}, []);


    async function cancel(id) {
        try {
            setError("");
            setMessage("");

            const response = await api.patch(
                `/admin/events/${id}/cancel`
            );

            setMessage(
                response.data.message || "Event cancelled successfully"
            );

            await fetchEvents();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to cancel event"
            );
        }
    }

    if (loading) {
        return (
            <div className="admin-layout">
                <Navbar />
                <Sidebar role="admin" />

                <main className="admin-main">
                    <div className="admin-loading">
                        Loading events...
                    </div>
                </main>
            </div>
        );
    }

    if (error && events.length === 0) {
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

                <div className="admin-header admin-header-with-action">

                    <div>
                        <h1>Events Management</h1>
                        <p>
                            Create, monitor, and manage system events.
                        </p>
                    </div>

                    <Link
                        to="/admin/create-event"
                        className="admin-primary-button"
                    >
                        + Create Event
                    </Link>

                </div>

                {message && (
                    <div className="admin-success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="admin-error-message">
                        {error}
                    </div>
                )}

                <section className="admin-summary">

                    <div className="summary-card">
                        <span className="summary-icon">🟢</span>
                        <div>
                            <span>Active Events</span>
                            <strong>{active}</strong>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span className="summary-icon">🟡</span>
                        <div>
                            <span>Registration Closed</span>
                            <strong>{registration_closed}</strong>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span className="summary-icon">🔵</span>
                        <div>
                            <span>Ended Events</span>
                            <strong>{ended}</strong>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span className="summary-icon">🔴</span>
                        <div>
                            <span>Cancelled Events</span>
                            <strong>{cancelled}</strong>
                        </div>
                    </div>

                </section>

                <section className="admin-table-card">

                    <div className="admin-table-header">
                        <div>
                            <h2>All Events</h2>
                            <p>
                                View and manage all registered events.
                            </p>
                        </div>
                    </div>

                    {events.length === 0 ? (

                        <div className="admin-empty-state">
                            <div>📅</div>
                            <h3>No events available</h3>
                            <p>
                                There are currently no events in the system.
                            </p>
                        </div>

                    ) : (

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Location</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Registration Deadline</th>
                                        <th>Total Seats</th>
                                        <th>Available Seats</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {events.map((event) => (

                                        <tr key={event.id}>

                                            <td className="table-title">
                                                {event.title}
                                            </td>

                                            <td className="table-description">
                                                {event.description}
                                            </td>

                                            <td>
                                                {event.location}
                                            </td>

                                            <td>
                                                {formatDate(event.event_start_at)}
                                            </td>

                                            <td>
                                                {formatDate(event.event_end_at)}
                                            </td>

                                            <td>
                                                {formatDate(event.registration_deadline)}
                                            </td>

                                            <td>
                                                {event.total_seats}
                                            </td>

                                            <td>
                                                {event.available_seats}
                                            </td>

                                            <td>
                                                {event.price}
                                            </td>

                                            <td>
                                                <button
                                                    className="admin-danger-button"
                                                    onClick={() =>
                                                        cancel(event.id)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </td>

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

