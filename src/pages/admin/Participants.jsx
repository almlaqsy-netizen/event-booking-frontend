// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function Participants() {

//     const [events, setEvents] = useState([]);
//     const [participants, setParticepents] = useState([]);
//     const [seats, setSeats] = useState([]);

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         async function fetchEvents() {
//             try {
//                 const response = await api.get(
//                     "/admin/events/participants-index"
//                 );

//                 setEvents(response.data.events);

//             } catch (error) {

//                 setError(
//                     error.response?.data?.message ||
//                     "Failed to fetch events"
//                 );

//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchEvents();

//     }, []);


//     // async function showparticepents(event_id) {

//     //     try {

//     //         const response = await api.get(
//     //             `/admin/events/${event_id}/participants`
//     //         );

//     //         setParticepents(response.data.participants);

//     //     } catch (error) {

//     //         setError(
//     //             error.response?.data?.message ||
//     //             "Cannot show the participants."
//     //         );
//     //     }
//     // }
//     async function showparticepents(event_id) {

//     try {

//         // إزالة المشاركين السابقين
//         setParticepents([]);

//         const response = await api.get(
//             `/admin/events/${event_id}/participants`
//         );

//         console.log("PARTICIPANTS RESPONSE:", response.data);

//         setParticepents(response.data.participants || []);

//     } catch (error) {

//         setParticepents([]);

//         setError(
//             error.response?.data?.message ||
//             "Cannot show the participants."
//         );
//     }
// }


//     async function showSeats(booking_id) {

//         try {

//             const response = await api.get(
//                 `/admin/bookings/${booking_id}/seats`
//             );
//             console.log("SEATS RESPONSE:", response.data);

//             setSeats(response.data.seats);

//         } catch (error) {

//             setError(
//                 error.response?.data?.message ||
//                 "Cannot show the seats."
//             );
//         }
//     }


//     if (loading) {
//         return <p>loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }


//     return (
//         <div>

//             {events.length === 0 ? (

//                 <p>no data available</p>

//             ) : (

//                 events.map((event) => (

//                     <div key={event.id}>

//                         <h2>{event.title}</h2>

//                         <p>Description: {event.description}</p>
//                         <p>Location: {event.location}</p>
//                         <p>Event start: {event.event_start_at}</p>
//                         <p>Event end: {event.event_end_at}</p>
//                         <p>Registration deadline: {event.registration_deadline}</p>
//                         <p>Total seats: {event.total_seats}</p>
//                         <p>Available seats: {event.available_seats}</p>
//                         <p>Price: {event.price}</p>
//                         <p>Status: {event.status}</p>
//                         <p>Created at: {event.created_at}</p>

//                         <button
//                             onClick={() => showparticepents(event.id)}
//                         >
//                             See the participants
//                         </button>

//                     </div>

//                 ))

//             )}


//             {/* Participants */}

//             {participants.length === 0 ? (

//                 <p>no data available</p>

//             ) : (

//                 participants.map((participant) => (

//                     <div key={participant.id}>

//                         <h2>{participant.user.full_name}</h2>

//                         <p>Email: {participant.user.email}</p>

//                         <p>Phone: {participant.user.phone_number}</p>

//                         <p>
//                             Booked seats: {participant.booked_seats_count}
//                         </p>

//                         <p>Status: {participant.status}</p>

//                         <p>Paid amount: {participant.paid_amount}</p>

//                         <button
//                             onClick={() => showSeats(participant.id)}
//                         >
//                             See booked seats
//                         </button>

//                     </div>

//                 ))

//             )}



//             {/* Seats */}

//             {seats.map((seat) => (

//                 <div key={seat.id}>

//                     <p>
//                         Seat number: {seat.seat_number}
//                     </p>

//                     <p>
//                         Status: {seat.status}
//                     </p>

//                 </div>

//             ))}

//         </div>
//     );
// }



import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/admin.css";

export default function Participants() {

    const [events, setEvents] = useState([]);
    const [participants, setParticepents] = useState([]);
    const [seats, setSeats] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchEvents() {

            try {

                const response = await api.get(
                    "/admin/events/participants-index"
                );

                setEvents(response.data.events);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch events"
                );

            } finally {

                setLoading(false);

            }
        }

        fetchEvents();

    }, []);


    async function showparticepents(event_id) {

        try {

            setError("");
            setParticepents([]);
            setSeats([]);

            const response = await api.get(
                `/admin/events/${event_id}/participants`
            );

            console.log(
                "PARTICIPANTS RESPONSE:",
                response.data
            );

            setParticepents(
                response.data.participants || []
            );

        } catch (error) {

            setParticepents([]);

            setError(
                error.response?.data?.message ||
                "Cannot show the participants."
            );

        }
    }


    async function showSeats(booking_id) {

        try {

            setError("");
            setSeats([]);

            const response = await api.get(
                `/admin/bookings/${booking_id}/seats`
            );

            console.log(
                "SEATS RESPONSE:",
                response.data
            );

            setSeats(response.data.seats || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Cannot show the seats."
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

                <div className="admin-header">

                    <div>
                        <h1>Participants</h1>

                        <p>
                            View event participants and their booked seats.
                        </p>
                    </div>

                </div>


                {error && (
                    <div className="admin-error-message">
                        {error}
                    </div>
                )}


                {/* Events */}

                <section className="participant-section">

                    <div className="admin-section-title">
                        <h2>Events</h2>

                        <p>
                            Select an event to view its participants.
                        </p>
                    </div>


                    {events.length === 0 ? (

                        <div className="admin-empty-state">
                            <div>📅</div>

                            <h3>No events available</h3>

                            <p>
                                There are currently no events to display.
                            </p>
                        </div>

                    ) : (

                        <div className="participant-events-grid">

                            {events.map((event) => (

                                <div
                                    className="participant-event-card"
                                    key={event.id}
                                >

                                    <div className="participant-event-header">

                                        <h3>
                                            {event.title}
                                        </h3>

                                        <span className="event-status">
                                            {event.status}
                                        </span>

                                    </div>

                                    <p className="participant-description">
                                        {event.description}
                                    </p>

                                    <div className="participant-info">

                                        <div>
                                            <span>📍 Location</span>
                                            <strong>
                                                {event.location}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>🪑 Seats</span>
                                            <strong>
                                                {event.available_seats}
                                                {" / "}
                                                {event.total_seats}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>💰 Price</span>
                                            <strong>
                                                {event.price}
                                            </strong>
                                        </div>

                                    </div>

                                    <button
                                        className="admin-primary-button full-width"
                                        onClick={() =>
                                            showparticepents(event.id)
                                        }
                                    >
                                        See Participants
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* Participants */}

                <section className="participant-section">

                    <div className="admin-section-title">

                        <h2>Participants</h2>

                        <p>
                            Participants for the selected event.
                        </p>

                    </div>


                    {participants.length === 0 ? (

                        <div className="admin-empty-state small">

                            <div>👥</div>

                            <h3>No participants</h3>

                            <p>
                                Select an event to view its participants.
                            </p>

                        </div>

                    ) : (

                        <div className="participants-grid">

                            {participants.map((participant) => (

                                <div
                                    className="participant-card"
                                    key={participant.id}
                                >

                                    <div className="participant-avatar">
                                        👤
                                    </div>

                                    <div className="participant-details">

                                        <h3>
                                            {participant.user.full_name}
                                        </h3>

                                        <p>
                                            {participant.user.email}
                                        </p>

                                        <p>
                                            {participant.user.phone_number}
                                        </p>

                                    </div>

                                    <div className="participant-meta">

                                        <span>
                                            Booked Seats
                                        </span>

                                        <strong>
                                            {participant.booked_seats_count}
                                        </strong>

                                    </div>

                                    <div className="participant-meta">

                                        <span>
                                            Paid Amount
                                        </span>

                                        <strong>
                                            {participant.paid_amount}
                                        </strong>

                                    </div>

                                    <div className="participant-status">
                                        {participant.status}
                                    </div>

                                    <button
                                        className="admin-secondary-button full-width"
                                        onClick={() =>
                                            showSeats(participant.id)
                                        }
                                    >
                                        See Booked Seats
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* Seats */}

                <section className="participant-section">

                    <div className="admin-section-title">

                        <h2>Booked Seats</h2>

                        <p>
                            Seats booked by the selected participant.
                        </p>

                    </div>


                    {seats.length === 0 ? (

                        <div className="admin-empty-state small">

                            <div>🪑</div>

                            <h3>No seats selected</h3>

                            <p>
                                Select a participant to view their seats.
                            </p>

                        </div>

                    ) : (

                        <div className="admin-seats-grid">

                            {seats.map((seat) => (

                                <div
                                    className="admin-seat-card"
                                    key={seat.id}
                                >

                                    <span className="seat-number">
                                        {seat.seat_number}
                                    </span>

                                    <span className="seat-status">
                                        {seat.status}
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}
