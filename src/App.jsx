
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Regesteration from "./pages/Regesteration";

import ProtectedRoute from "./components/ProtectedRoute";

import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// user
import Events from "./pages/user/Events";
import EventDetails from "./pages/user/EventDetails";
import Bookings from "./pages/user/Bookings";
import BookingSeats from "./pages/user/BookingSeats";
import ChangePassword from "./pages/user/ChangePassword";


// admin
import EventsManagement from "./pages/admin/EventsManagement"
import CreateEvent from "./pages/admin/CreateEvent";
import Participants from "./pages/admin/Participants";
import Logs from "./pages/admin/Logs";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Default */}
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Regesteration />}
                />

                <Route
                    path="/ForgotPassword"
                    element={<ForgotPassword />}
                />
                
                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                {/* User Dashboard */}
                <Route
                    path="/user/UserDashboard"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Available Events */}
                <Route
                    path="/user/events"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <Events />
                        </ProtectedRoute>
                    }
                />

                {/* Event Details + booking*/}
                <Route
                    path="/user/events/:event"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <EventDetails />
                        </ProtectedRoute>
                    }
                />
                
                
                {/* show my booking*/}
                <Route
                    path="/user/bookings"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <Bookings />
                        </ProtectedRoute>
                    }
                    />

                    {/* show booking seats + cancele*/}
                <Route
                    path="/user/bookings/:booking/seats"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <BookingSeats/>
                        </ProtectedRoute>
                    }
                />

                 {/* change password*/}
                <Route
                    path="/user/change-password"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <ChangePassword/>
                        </ProtectedRoute>
                    }
                />
                

                {/* Admin Dashboard */}
                <Route
                    path="/admin/AdminDashboard"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Events Management */}
                <Route
                    path="/admin/events"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <EventsManagement />
                        </ProtectedRoute>
                    }
                />

                {/* Create Event */}
                <Route
                    path="/admin/create-event"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <CreateEvent />
                        </ProtectedRoute>
                    }
                />

                {/* Participants */}
                <Route
                    path="/admin/participants"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Participants />
                        </ProtectedRoute>
                    }
                />
                <Route path="/admin/logs/:type" element={
                    <ProtectedRoute allowedRole="admin">
                        <Logs />
                    </ProtectedRoute>
                    } />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
