import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

export default function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post("/reset-password", {

                email: email,
                otp: otp,
                password: password,
                password_confirmation: passwordConfirmation

            });

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);
        }
    }


    if (!email) {

        return (
            <div className="auth-page">

                <div className="auth-card">

                    <div className="error-message">
                        Email information is missing.
                    </div>

                    <div className="auth-footer">
                        <Link to="/forgot-password">
                            Go back
                        </Link>
                    </div>

                </div>

            </div>
        );
    }


    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <div className="auth-logo">
                        🔑
                    </div>

                    <h1>Reset Password</h1>

                    <p>
                        Enter the OTP from Google Authenticator
                    </p>

                </div>


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            disabled
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="otp">
                            OTP
                        </label>

                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="password">
                            New Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="password_confirmation">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="password_confirmation"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            placeholder="Confirm new password"
                            required
                        />

                    </div>


                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}


                    <button
                        className="auth-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>


                <div className="auth-footer">

                    <p>
                        Remember your password?{" "}
                        <Link to="/login">
                            Back to Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}