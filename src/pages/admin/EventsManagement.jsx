import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/admin.css";

export default function EventsManagement() {
    const [events, setEvents] = useState([]);

    const [active, setActive] = useState(0);
    const [registration_closed, setRegistration_closed] = useState(0);
    const [ended, setEnded] = useState(0);
    const [cancelled, setCancelled] = useState(0);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("active");

    async function fetchEvents(status = selectedStatus) {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/admin/events", {
                params: {
                    status: status,
                },
            });

            setEvents(response.data.events || []);

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

    useEffect(() => {
        fetchEvents("active");
    }, []);

    function formatDate(date) {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    async function cancel(id) {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this event?"
        );

        if (!confirmed) return;

        try {
            setError("");
            setMessage("");

            const response = await api.patch(
                `/admin/events/${id}/cancel`
            );

            setMessage(
                response.data.message || "Event cancelled successfully"
            );

            await fetchEvents(selectedStatus);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to cancel event"
            );
        }
    }

    function handleStatusChange(status) {
        setSelectedStatus(status);
        setMessage("");
        fetchEvents(status);
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

                    <button
                        className="admin-primary-button"
                        onClick={() => fetchEvents(selectedStatus)}
                    >
                        Retry
                    </button>
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
                            <h2>Events</h2>
                            <p>
                                Filter events by their current status.
                            </p>
                        </div>
                    </div>

                    <div className="event-status-filters">
                        <button
                            type="button"
                            className={
                                selectedStatus === "active" ? "selected" : ""
                            }
                            onClick={() => handleStatusChange("active")}
                        >
                            Active ({active})
                        </button>

                        <button
                            type="button"
                            className={
                                selectedStatus === "registration_closed"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                handleStatusChange("registration_closed")
                            }
                        >
                            Registration Closed ({registration_closed})
                        </button>

                        <button
                            type="button"
                            className={
                                selectedStatus === "ended" ? "selected" : ""
                            }
                            onClick={() => handleStatusChange("ended")}
                        >
                            Ended ({ended})
                        </button>

                        <button
                            type="button"
                            className={
                                selectedStatus === "cancelled" ? "selected" : ""
                            }
                            onClick={() => handleStatusChange("cancelled")}
                        >
                            Cancelled ({cancelled})
                        </button>
                    </div>

                    {events.length === 0 ? (
                        <div className="admin-empty-state">
                            <div>📅</div>
                            <h3>No events found</h3>
                            <p>
                                There are no events with this status.
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
                                        <th>Status</th>
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

                                            <td>{event.location}</td>

                                            <td>
                                                {formatDate(event.event_start_at)}
                                            </td>

                                            <td>
                                                {formatDate(event.event_end_at)}
                                            </td>

                                            <td>
                                                {formatDate(
                                                    event.registration_deadline
                                                )}
                                            </td>

                                            <td>{event.total_seats}</td>
                                            <td>{event.available_seats}</td>
                                            <td>{event.price}</td>
                                            <td>{event.status}</td>

                                            <td>
                                                {event.status === "active" && (
                                                    <button
                                                        type="button"
                                                        className="admin-danger-button"
                                                        onClick={() =>
                                                            cancel(event.id)
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
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