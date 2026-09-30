import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/user.css";

function Events() {

const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

    useEffect(() => {

        async function fetchEvents() {

            try {

                const response = await api.get(
                    "/user/events/available"
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

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
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
    // return (
    //     <div>

    //         <h1>Available Events</h1>

    //         {events.length === 0 ? (
    //             <p>No available events.</p>
    //         ) : (

    //             events.map((event) => (

    //                 <div key={event.id}>

    //                     <h2>{event.title}</h2>

    //                     <p>{event.description}</p>

    //                     <p>Location: {event.location}</p>

    //                     <p>
    //                         Start: {event.event_start_at}
    //                     </p>

    //                     <p>
    //                         End: {event.event_end_at}
    //                     </p>

    //                     <p>
    //                         Available seats: {event.available_seats}
    //                     </p>

    //                     <p>
    //                         Price: {event.price}
    //                     </p>

    //                     <Link to={`/user/events/${event.id}`}>
    //                         View Details
    //                     </Link>

    //                 </div>

    //             ))

    //         )}

    //     </div>
    // );
  
return (
    <div className="user-page">

        <div className="page-header">

            <div>
                <h1>Available Events</h1>

                <p>
                    Discover upcoming events and reserve your seats.
                </p>
            </div>

        </div>


        {events.length === 0 ? (

            <div className="empty-state">

                <div className="empty-icon">
                    🎫
                </div>

                <h2>No available events</h2>

                <p>
                    There are currently no events available for booking.
                </p>

            </div>

        ) : (

            <div className="events-grid">

                {events.map((event) => (

                    <div
                        className="event-card"
                        key={event.id}
                    >

                        <div className="event-card-top">

                            <span className="event-badge">
                                Available
                            </span>

                            <span className="event-price">
                                {event.price}
                            </span>

                        </div>


                        <h2>
                            {event.title}
                        </h2>


                        <p className="event-description">
                            {event.description}
                        </p>


                        <div className="event-details">

                            <div>
                                <span>📍</span>
                                {event.location}
                            </div>

                            <div>
                                <span>🕐</span>
                                {formatDate(event.event_start_at)}
                            </div>

                            <div>
                                <span>🪑</span>
                                {event.available_seats}
                                {" "}seats available
                            </div>

                        </div>


                        <Link
                            to={`/user/events/${event.id}`}
                            className="primary-button"
                        >
                            View Details
                        </Link>

                    </div>

                ))}

            </div>

        )}

    </div>
);

}

export default Events;