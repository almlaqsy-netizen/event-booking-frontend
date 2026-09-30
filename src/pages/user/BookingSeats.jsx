import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/user.css";

// جلب الكراسي مشان الإلغاء
export default function BookingSeats() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [seats, setSeats] = useState([]);
    const [cancelLoading, setCancelLoading] = useState(false);

    const { booking } = useParams();

    useEffect(() => {

        async function fetchSeats() {

            try {

                const response = await api.get(
                    `/user/bookings/${booking}/seats`
                );

                setSeats(response.data.seats);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch my seats"
                );

            } finally {

                setLoading(false);

            }
        }

        fetchSeats();

    }, [booking]);


    async function handleCancel(seatId) {

        try {

            setCancelLoading(true);
            setError("");

            console.log("seatId:", seatId);

            await api.patch(
                `/user/bookings/${booking}/cancel-seats`,
                {
                    seat_ids: [seatId]
                }
            );

            setSeats(
                seats.filter((seat) => seat.id !== seatId)
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to cancel seat"
            );

        } finally {

            setCancelLoading(false);

        }
    }


    if (loading) {
        return <p>Loading seats...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }


    // return (
    //     <div>

    //         <h1>Booked Seats</h1>

    //         {seats.length === 0 ? (

    //             <p>No booked seats found.</p>

    //         ) : (

    //             <ul>

    //                 {seats.map((seat) => (

    //                     <li key={seat.id}>

    //                         Seat {seat.seat_number}

    //                         <button
    //                             onClick={() => handleCancel(seat.id)}
    //                             disabled={cancelLoading}
    //                         >
    //                             Cancel
    //                         </button>

    //                     </li>

    //                 ))}

    //             </ul>

    //         )}

    //     </div>
    // );
    
return (
    <div className="user-page">

        <div className="page-header">

            <div>
                <h1>Booked Seats</h1>

                <p>
                    Manage the seats included in your booking.
                </p>
            </div>

        </div>


        {seats.length === 0 ? (

            <div className="empty-state">

                <div className="empty-icon">
                    🪑
                </div>

                <h2>No booked seats found</h2>

                <p>
                    There are no active seats in this booking.
                </p>

            </div>

        ) : (

            <div className="seats-grid">

                {seats.map((seat) => (

                    <div
                        className="seat-card"
                        key={seat.id}
                    >

                        <div className="seat-number">
                            {seat.seat_number}
                        </div>

                        <div className="seat-details">

                            <h3>
                                Seat {seat.seat_number}
                            </h3>

                            <span className="status-badge status-booked">
                                {seat.status}
                            </span>

                        </div>


                        <button
                            className="danger-button"
                            onClick={() =>
                                handleCancel(seat.id)
                            }
                            disabled={cancelLoading}
                        >
                            {cancelLoading
                                ? "Cancelling..."
                                : "Cancel Seat"}
                        </button>

                    </div>

                ))}

            </div>

        )}

    </div>
);


}
