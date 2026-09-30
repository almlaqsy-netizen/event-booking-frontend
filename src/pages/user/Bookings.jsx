
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import "../../styles/user.css";
// جلب الحجوزات
export default function Bookings() {

    const [bookings, setBokkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

        async function fetchBookings() {

            try {

                const response = await api.get("/user/bookings");

                setBokkings(response.data.bookings);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch my bookings"
                );

            } finally {

                setLoading(false);

            }
        }

        fetchBookings();

    }, []);


    if (loading) {
        return <p>Loading bookings...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }


    // return (
    //     <div>

    //         <h1>My Bookings</h1>

    //         {bookings.length === 0 ? (

    //             <p>No bookings found.</p>

    //         ) : (

    //             bookings.map((booking) => (

    //                 <div key={booking.id}>

    //                     <hr />

    //                     <h2>{booking.event.title}</h2>

    //                     <p>
    //                         Description: {booking.event.description}
    //                     </p>

    //                     <p>
    //                         Location: {booking.event.location}
    //                     </p>

    //                     <p>
    //                         Start: {booking.event.event_start_at}
    //                     </p>

    //                     <p>
    //                         End: {booking.event.event_end_at}
    //                     </p>

    //                     <p>
    //                         Number of seats: {booking.booked_seats_count}
    //                     </p>

    //                     <p>
    //                         Paid amount: {booking.paid_amount}
    //                     </p>

    //                     <p>
    //                         Status: {booking.status}
    //                     </p>

    //                     <Link to={`/user/bookings/${booking.id}/seats`}>
    //                         <button type="button">
    //                             View Seats
    //                         </button>
    //                     </Link>
    //                     <br /><br />
    //                     <h3>Booked Seats</h3>

    //                     {/* <ul>

    //                         {booking.active_booking_seats.map((bookingSeat) => (

    //                             <li key={bookingSeat.id}>
    //                                 Seat {bookingSeat.seat.seat_number}
    //                             </li>

    //                         ))}

    //                     </ul> */}

    //                 </div>

    //             ))

    //         )}

    //     </div>
    // );

return (
    <div className="user-page">

        <div className="page-header">
            <div>
                <h1>My Bookings</h1>
                <p>View and manage your event bookings.</p>
            </div>
        </div>


        {bookings.length === 0 ? (

            <div className="empty-state">
                <div className="empty-icon">📅</div>

                <h2>No bookings found</h2>

                <p>
                    You haven't booked any events yet.
                </p>

                <Link
                    to="/user/events"
                    className="primary-button"
                >
                    Browse Events
                </Link>
            </div>

        ) : (

            <div className="bookings-grid">

                {bookings.map((booking) => (

                    <div
                        className="booking-card"
                        key={booking.id}
                    >

                        <div className="booking-card-header">

                            <div>

                                <h2>
                                    {booking.event.title}
                                </h2>

                                <span className="booking-id">
                                    Booking #{booking.id}
                                </span>

                            </div>

                            <span
                                className={`status-badge status-${booking.status}`}
                            >
                                {booking.status}
                            </span>

                        </div>


                        <p className="booking-description">
                            {booking.event.description}
                        </p>


                        <div className="booking-info-grid">

                            <div className="info-item">
                                <span className="info-label">
                                    📍 Location
                                </span>

                                <strong>
                                    {booking.event.location}
                                </strong>
                            </div>


                            <div className="info-item">
                                <span className="info-label">
                                    🪑 Seats
                                </span>

                                <strong>
                                    {booking.booked_seats_count}
                                </strong>
                            </div>


                            <div className="info-item">
                                <span className="info-label">
                                    🕐 Start
                                </span>

                                <strong>
                                    {formatDate(booking.event.event_start_at)}
                                </strong>
                            </div>


                            <div className="info-item">
                                <span className="info-label">
                                    💳 Paid
                                </span>

                                <strong>
                                    {booking.paid_amount}
                                </strong>
                            </div>

                        </div>


                        <div className="booking-card-footer">

                            <Link
                                to={`/user/bookings/${booking.id}/seats`}
                                className="primary-button"
                            >
                                View Booked Seats
                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        )}

    </div>
);

}

