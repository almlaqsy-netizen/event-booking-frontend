// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// export default function CreateEvent() {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         location: "",
//         event_start_at: "",
//         event_end_at: "",
//         registration_deadline: "",
//         total_seats: "",
//         price: ""
//     });

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     function handleChange(e) {
//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();

//         setError("");
//         setLoading(true);

//         try {
//             const response = await api.post("/admin/events", formData);

//             alert(response.data.message || "Event created successfully");

//             navigate("/admin/events");
//         } catch (error) {
//             setError(
//                 error.response?.data?.message ||
//                 "Failed to create event"
//             );
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>

//             <label htmlFor="title">Title</label>
//             <input
//                 type="text"
//                 name="title"
//                 id="title"
//                 value={formData.title}
//                 onChange={handleChange}
//             />

//             <br />

//             <label htmlFor="description">Description</label>
//             <input
//                 type="text"
//                 name="description"
//                 id="description"
//                 value={formData.description}
//                 onChange={handleChange}
//             />

//             <br />

//             <label htmlFor="location">Location</label>
//             <input
//                 type="text"
//                 name="location"
//                 id="location"
//                 value={formData.location}
//                 onChange={handleChange}
//             />

//             <br />

//             <label htmlFor="event_start_at">Event Start At</label>
//             <input
//                 type="datetime-local"
//                 name="event_start_at"
//                 id="event_start_at"
//                 value={formData.event_start_at}
//                 onChange={handleChange}
//             />

//             <br />

//             <label htmlFor="event_end_at">Event End At</label>
//             <input
//                 type="datetime-local"
//                 name="event_end_at"
//                 id="event_end_at"
//                 value={formData.event_end_at}
//                 onChange={handleChange}
//             />

//             <br />

//             <label htmlFor="registration_deadline">
//                 Registration Deadline
//             </label>
//             <input
//                 type="datetime-local"
//                 name="registration_deadline"
//                 id="registration_deadline"
//                 value={formData.registration_deadline}
//                 onChange={handleChange}
//             />

//             <br />

//             <label htmlFor="total_seats">Total Seats</label>
//             <input
//                 type="number"
//                 name="total_seats"
//                 id="total_seats"
//                 value={formData.total_seats}
//                 onChange={handleChange}
//             />

//             <br />

//             <label htmlFor="price">Price</label>
//             <input
//                 type="number"
//                 name="price"
//                 id="price"
//                 value={formData.price}
//                 onChange={handleChange}
//             />

//             <br />

//             {error && <p>{error}</p>}

//             <button type="submit" disabled={loading}>
//                 {loading ? "Creating..." : "Create Event"}
//             </button>

//         </form>
//     );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/admin.css";


export default function CreateEvent() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        event_start_at: "",
        event_end_at: "",
        registration_deadline: "",
        total_seats: "",
        price: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/admin/events", formData);

            alert(response.data.message || "Event created successfully");

            navigate("/admin/events");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create event"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-layout">

            <Navbar />

            <Sidebar role="admin" />

            <main className="admin-main">

                <div className="admin-header">
                    <div>
                        <h1>Create Event</h1>
                        <p>
                            Create a new event and configure its details.
                        </p>
                    </div>
                </div>

                <div className="admin-form-card">

                    <div className="admin-form-header">
                        <div className="admin-form-icon">📅</div>

                        <div>
                            <h2>Event Information</h2>
                            <p>
                                Enter the information for the new event.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="admin-form"
                    >

                        <div className="admin-form-grid">

                            <div className="admin-form-group">
                                <label htmlFor="title">
                                    Event Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter event title"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="location">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter event location"
                                />
                            </div>

                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="description">
                                Description
                            </label>

                            <textarea
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter event description"
                                rows="5"
                            />
                        </div>

                        <div className="admin-form-grid">

                            <div className="admin-form-group">
                                <label htmlFor="event_start_at">
                                    Event Start
                                </label>

                                <input
                                    type="datetime-local"
                                    name="event_start_at"
                                    id="event_start_at"
                                    value={formData.event_start_at}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="event_end_at">
                                    Event End
                                </label>

                                <input
                                    type="datetime-local"
                                    name="event_end_at"
                                    id="event_end_at"
                                    value={formData.event_end_at}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="admin-form-grid">

                            <div className="admin-form-group">
                                <label htmlFor="registration_deadline">
                                    Registration Deadline
                                </label>

                                <input
                                    type="datetime-local"
                                    name="registration_deadline"
                                    id="registration_deadline"
                                    value={formData.registration_deadline}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="total_seats">
                                    Total Seats
                                </label>

                                <input
                                    type="number"
                                    name="total_seats"
                                    id="total_seats"
                                    value={formData.total_seats}
                                    onChange={handleChange}
                                    placeholder="Enter number of seats"
                                    min="1"
                                />
                            </div>

                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="price">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter event price"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {error && (
                            <div className="admin-error-message">
                                {error}
                            </div>
                        )}

                        <div className="admin-form-actions">

                            <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={() => navigate("/admin/events")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="admin-primary-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Event"}
                            </button>

                        </div>

                    </form>

                </div>

            </main>
        </div>
    );
}
