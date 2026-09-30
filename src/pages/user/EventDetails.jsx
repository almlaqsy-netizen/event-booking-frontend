import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/user.css";
// عرض التفاصيل مع الحجز
function EventDetails() {

    const { event } = useParams();

    // Event data
    const [eventData, setEventData] = useState(null);

    // Selected seats
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Card / PIN data
    const [pin, setPin] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [brand, setBrand] = useState("visa");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");

    // Event loading/error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Booking loading/error/success
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingMessage, setBookingMessage] = useState("");
    const [bookingError, setBookingError] = useState("");


    // Get event details
    useEffect(() => {

        async function fetchEvent() {

            try {

                const response = await api.get(
                    `/user/events/${event}`
                );

                setEventData(response.data.event);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch event"
                );

            } finally {

                setLoading(false);

            }
        }

        fetchEvent();

    }, [event]);

    function formatDate(date) {

    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}

    // Select / unselect seat
    function handleSeatClick(seatId) {

        setSelectedSeats((previousSeats) => {

            // If seat is already selected -> remove it
            if (previousSeats.includes(seatId)) {

                return previousSeats.filter(
                    (id) => id !== seatId
                );

            }

            // Otherwise -> add it
            return [...previousSeats, seatId];

        });

    }


    // Create booking
    async function handleBooking(e) {

        e.preventDefault();

        setBookingMessage("");
        setBookingError("");


        // Check seats
        if (selectedSeats.length === 0) {

            setBookingError(
                "Please select at least one seat."
            );

            return;
        }


        // Check PIN
        if (!pin) {

            setBookingError(
                "Please enter your PIN."
            );

            return;
        }


        try {

            setBookingLoading(true);


            const response = await api.post(
                "/user/bookings",
                {
                    event_id: eventData.id,

                    seat_ids: selectedSeats,

                    pin: pin,

                    card_holder_name:
                        cardHolderName || null,

                    card_number:
                        cardNumber || null,

                    brand:
                        brand || null,

                    exp_month:
                        expMonth
                            ? Number(expMonth)
                            : null,

                    exp_year:
                        expYear
                            ? Number(expYear)
                            : null,
                }
            );


            setBookingMessage(
                response.data.message ||
                "Booking created successfully."
            );


            // Clear selected seats
            setSelectedSeats([]);

            // Clear PIN
            setPin("");

            // Clear card data
            setCardHolderName("");
            setCardNumber("");
            setExpMonth("");
            setExpYear("");


            // Update event available seats locally
            setEventData((previousEvent) => ({
                ...previousEvent,

                available_seats:
                    previousEvent.available_seats -
                    selectedSeats.length,

                seats: previousEvent.seats.map((seat) => {

                    if (selectedSeats.includes(seat.id)) {

                        return {
                            ...seat,
                            status: "booked"
                        };

                    }

                    return seat;

                })

            }));


        } catch (error) {

            const validationErrors =
                error.response?.data?.errors;


            if (validationErrors) {

                const firstError =
                    Object.values(validationErrors)[0]?.[0];

                setBookingError(
                    firstError ||
                    "Booking failed."
                );

            } else {

                setBookingError(
                    error.response?.data?.message ||
                    "Failed to create booking."
                );

            }

        } finally {

            setBookingLoading(false);

        }

    }


    // Loading
    if (loading) {

        return <p>Loading event...</p>;

    }


    // Error while fetching event
    if (error) {

        return (
            <p style={{ color: "red" }}>
                {error}
            </p>
        );

    }


    // Event doesn't exist
    if (!eventData) {

        return <p>Event not found.</p>;

    }


    // return (

    //     <div>

    //         <h1>{eventData.title}</h1>

    //         <p>
    //             {eventData.description}
    //         </p>


    //         <p>
    //             <strong>Location:</strong>{" "}
    //             {eventData.location}
    //         </p>


    //         <p>
    //             <strong>Start:</strong>{" "}
    //             {eventData.event_start_at}
    //         </p>


    //         <p>
    //             <strong>End:</strong>{" "}
    //             {eventData.event_end_at}
    //         </p>


    //         <p>
    //             <strong>
    //                 Registration deadline:
    //             </strong>{" "}
    //             {eventData.registration_deadline}
    //         </p>


    //         <p>
    //             <strong>Total seats:</strong>{" "}
    //             {eventData.total_seats}
    //         </p>


    //         <p>
    //             <strong>Available seats:</strong>{" "}
    //             {eventData.available_seats}
    //         </p>


    //         <p>
    //             <strong>Price per seat:</strong>{" "}
    //             {eventData.price}
    //         </p>


    //         <hr />


    //         <h2>Seats</h2>


    //         <div>

    //             {eventData.seats.map((seat) => {

    //                 const isSelected =
    //                     selectedSeats.includes(seat.id);


    //                 const isAvailable =
    //                     seat.status === "available";


    //                 return (

    //                     <button
    //                         key={seat.id}
    //                         type="button"
    //                         disabled={!isAvailable}
    //                         onClick={() =>
    //                             handleSeatClick(seat.id)
    //                         }
    //                         style={{
    //                             margin: "5px",
    //                             padding: "10px",

    //                             backgroundColor:
    //                                 isSelected
    //                                     ? "green"
    //                                     : isAvailable
    //                                         ? "lightgray"
    //                                         : "red",

    //                             color:
    //                                 isSelected
    //                                     ? "white"
    //                                     : "black",

    //                             cursor:
    //                                 isAvailable
    //                                     ? "pointer"
    //                                     : "not-allowed"
    //                         }}
    //                     >
    //                         {seat.seat_number}
    //                     </button>

    //                 );

    //             })}

    //         </div>


    //         <hr />


    //         <h2>Selected Seats</h2>


    //         {selectedSeats.length === 0 ? (

    //             <p>
    //                 No seats selected.
    //             </p>

    //         ) : (

    //             <p>
    //                 {selectedSeats.length} seat(s) selected
    //             </p>

    //         )}


    //         <hr />


    //         <h2>Payment</h2>


    //         <form onSubmit={handleBooking}>

    //             <div>

    //                 <label htmlFor="pin">
    //                     Card PIN
    //                 </label>

    //                 <br />

    //                 <input
    //                     id="pin"
    //                     type="password"
    //                     value={pin}
    //                     onChange={(e) =>
    //                         setPin(e.target.value)
    //                     }
    //                     minLength={4}
    //                     maxLength={10}
    //                     placeholder="Enter card PIN"
    //                 />

    //             </div>


    //             <br />


    //             <div>

    //                 <label htmlFor="cardHolderName">
    //                     Card Holder Name
    //                 </label>

    //                 <br />

    //                 <input
    //                     id="cardHolderName"
    //                     type="text"
    //                     value={cardHolderName}
    //                     onChange={(e) =>
    //                         setCardHolderName(e.target.value)
    //                     }
    //                     placeholder="Enter card holder name"
    //                 />

    //             </div>


    //             <br />


    //             <div>

    //                 <label htmlFor="cardNumber">
    //                     Card Number
    //                 </label>

    //                 <br />

    //                 <input
    //                     id="cardNumber"
    //                     type="text"
    //                     value={cardNumber}
    //                     onChange={(e) =>
    //                         setCardNumber(e.target.value)
    //                     }
    //                     placeholder="Enter card number"
    //                 />

    //             </div>


    //             <br />


    //             <div>

    //                 <label htmlFor="brand">
    //                     Card Brand
    //                 </label>

    //                 <br />

    //                 <select
    //                     id="brand"
    //                     value={brand}
    //                     onChange={(e) =>
    //                         setBrand(e.target.value)
    //                     }
    //                 >
    //                     <option value="visa">
    //                         Visa
    //                     </option>

    //                     <option value="mastercard">
    //                         Mastercard
    //                     </option>

    //                 </select>

    //             </div>


    //             <br />


    //             <div>

    //                 <label htmlFor="expMonth">
    //                     Expiration Month
    //                 </label>

    //                 <br />

    //                 <input
    //                     id="expMonth"
    //                     type="number"
    //                     min="1"
    //                     max="12"
    //                     value={expMonth}
    //                     onChange={(e) =>
    //                         setExpMonth(e.target.value)
    //                     }
    //                     placeholder="MM"
    //                 />

    //             </div>


    //             <br />


    //             <div>

    //                 <label htmlFor="expYear">
    //                     Expiration Year
    //                 </label>

    //                 <br />

    //                 <input
    //                     id="expYear"
    //                     type="number"
    //                     min={new Date().getFullYear()}
    //                     max="2100"
    //                     value={expYear}
    //                     onChange={(e) =>
    //                         setExpYear(e.target.value)
    //                     }
    //                     placeholder="YYYY"
    //                 />

    //             </div>


    //             <br />


    //             <button
    //                 type="submit"
    //                 disabled={bookingLoading}
    //             >
    //                 {bookingLoading
    //                     ? "Booking..."
    //                     : "Book Selected Seats"}
    //             </button>

    //         </form>


    //         {bookingMessage && (

    //             <p style={{ color: "green" }}>
    //                 {bookingMessage}
    //             </p>

    //         )}


    //         {bookingError && (

    //             <p style={{ color: "red" }}>
    //                 {bookingError}
    //             </p>

    //         )}

    //     </div>

    // );
return (

    <div className="user-page">

        {/* Event Header */}

        <div className="event-details-header">

            <div>

                <span className="event-badge">
                    Event
                </span>

                <h1>
                    {eventData.title}
                </h1>

                <p>
                    {eventData.description}
                </p>

            </div>

        </div>


        <div className="event-details-layout">

            {/* LEFT SIDE */}

            <div className="event-main-content">

                <div className="details-card">

                    <h2>Event Information</h2>

                    <div className="event-info-grid">

                        <div>
                            <span>📍 Location</span>
                            <strong>
                                {eventData.location}
                            </strong>
                        </div>

                        <div>
                            <span>🕐 Start</span>
                            <strong>
                                {formatDate(eventData.event_start_at)}
                            </strong>
                        </div>

                        <div>
                            <span>🕐 End</span>
                            <strong>
                                {formatDate(eventData.event_end_at)}
                            </strong>
                        </div>

                        <div>
                            <span>📅 Registration Deadline</span>
                            <strong>
                                {formatDate(eventData.registration_deadline)}
                            </strong>
                        </div>

                        <div>
                            <span>🪑 Total Seats</span>
                            <strong>
                                {eventData.total_seats}
                            </strong>
                        </div>

                        <div>
                            <span>🟢 Available Seats</span>
                            <strong>
                                {eventData.available_seats}
                            </strong>
                        </div>

                    </div>

                </div>


                {/* Seats */}

                <div className="details-card">

                    <div className="section-heading">

                        <div>
                            <h2>Select Your Seats</h2>

                            <p>
                                Choose one or more available seats.
                            </p>
                        </div>

                        <span className="seat-price">
                            {eventData.price} / seat
                        </span>

                    </div>


                    <div className="seat-legend">

                        <span>
                            <i className="legend available"></i>
                            Available
                        </span>

                        <span>
                            <i className="legend selected"></i>
                            Selected
                        </span>

                        <span>
                            <i className="legend booked"></i>
                            Booked
                        </span>

                    </div>


                    <div className="seat-grid">

                        {eventData.seats.map((seat) => {

                            const isSelected =
                                selectedSeats.includes(
                                    seat.id
                                );

                            const isAvailable =
                                seat.status === "available";

                            return (

                                <button
                                    key={seat.id}
                                    type="button"
                                    disabled={!isAvailable}
                                    className={`
                                        seat-button
                                        ${isSelected
                                            ? "selected"
                                            : ""}
                                        ${!isAvailable
                                            ? "booked"
                                            : ""}
                                    `}
                                    onClick={() =>
                                        handleSeatClick(
                                            seat.id
                                        )
                                    }
                                >
                                    {seat.seat_number}
                                </button>

                            );

                        })}

                    </div>

                </div>


                {/* Selected Seats */}

                <div className="selected-seats-card">

                    <div>

                        <h3>
                            Selected Seats
                        </h3>

                        <p>
                            {selectedSeats.length === 0
                                ? "No seats selected."
                                : `${selectedSeats.length} seat(s) selected`}
                        </p>

                    </div>

                    <div className="selected-count">
                        {selectedSeats.length}
                    </div>

                </div>

            </div>


            {/* PAYMENT */}

            <div className="payment-card">

                <div className="payment-header">

                    <h2>Payment</h2>

                    <p>
                        Complete your booking securely.
                    </p>

                </div>


                <form onSubmit={handleBooking}>

                    <div className="form-group">

                        <label htmlFor="pin">
                            Card PIN
                        </label>

                        <input
                            id="pin"
                            type="password"
                            value={pin}
                            onChange={(e) =>
                                setPin(e.target.value)
                            }
                            minLength={4}
                            maxLength={10}
                            placeholder="Enter card PIN"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="cardHolderName">
                            Card Holder Name
                        </label>

                        <input
                            id="cardHolderName"
                            type="text"
                            value={cardHolderName}
                            onChange={(e) =>
                                setCardHolderName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter card holder name"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="cardNumber">
                            Card Number
                        </label>

                        <input
                            id="cardNumber"
                            type="text"
                            value={cardNumber}
                            onChange={(e) =>
                                setCardNumber(
                                    e.target.value
                                )
                            }
                            placeholder="Enter card number"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="brand">
                            Card Brand
                        </label>

                        <select
                            id="brand"
                            value={brand}
                            onChange={(e) =>
                                setBrand(e.target.value)
                            }
                        >
                            <option value="visa">
                                Visa
                            </option>

                            <option value="mastercard">
                                Mastercard
                            </option>
                        </select>

                    </div>


                    <div className="expiration-grid">

                        <div className="form-group">

                            <label htmlFor="expMonth">
                                Month
                            </label>

                            <input
                                id="expMonth"
                                type="number"
                                min="1"
                                max="12"
                                value={expMonth}
                                onChange={(e) =>
                                    setExpMonth(
                                        e.target.value
                                    )
                                }
                                placeholder="MM"
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="expYear">
                                Year
                            </label>

                            <input
                                id="expYear"
                                type="number"
                                min={new Date().getFullYear()}
                                max="2100"
                                value={expYear}
                                onChange={(e) =>
                                    setExpYear(
                                        e.target.value
                                    )
                                }
                                placeholder="YYYY"
                            />

                        </div>

                    </div>


                    {bookingMessage && (

                        <div className="success-message">
                            {bookingMessage}
                        </div>

                    )}


                    {bookingError && (

                        <div className="error-message">
                            {bookingError}
                        </div>

                    )}


                    <button
                        type="submit"
                        className="primary-button full-width"
                        disabled={bookingLoading}
                    >
                        {bookingLoading
                            ? "Processing..."
                            : "Book Selected Seats"}
                    </button>

                </form>

            </div>

        </div>

    </div>
);

}

export default EventDetails;