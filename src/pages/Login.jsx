// import { useState } from "react";
// import api from "../api/axios";
// import { QRCodeSVG } from "qrcode.react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [Error, setError] = useState("");
//     const [qrCode, setQrCode] = useState("");
//     const [secret,setSecret]=useState("");
//     const navigate = useNavigate();

//     async function handleSubmit(e) {
//     e.preventDefault();//منع الريفرش
     
//     try {
//         const response = await api.post("/login", {
//             email: email,
//             password: password
//         });

//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("role", response.data.role);

//         if (response.data.otpauth_url) {
//         setQrCode(response.data.otpauth_url);
//         setSecret(response.data.secret)
//         }
//         const role = response.data.role;

//         if (role === "user") {
//             navigate("/user/UserDashboard");
//         } else if (role === "admin") {
//             navigate("/admin/AdminDashboard");
//         }
//         // console.log(response.data);

//     } catch (error) {
//         setError(error.response.data.message);
//     }
//     }

//     return (
//         <div>
//             <h1>Login</h1>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//                 <button type="submit">
//                     Login
//                 </button> <br /> <p>
//                 Don't have an account?
//                 <Link to="/register">Register</Link>
//                 </p>
//                 <br />
//                 {Error && <p style={{color:"red"}}>{Error}</p>}
//                 {qrCode && (
//                 <div>
//                 <h2>Scan this QR code or put the secret key in application</h2>
//                 <br />
//                 <QRCodeSVG value={qrCode} />
//                 <br />
//                 <p>{secret}</p>
//                 </div>
//                 )}
//             </form>
//         </div>
//     );
// }

// export default Login;

import { useState } from "react";
import api from "../api/axios";
import { QRCodeSVG } from "qrcode.react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [secret, setSecret] = useState("");
    const [role,setRole]=useState("");

    const navigate = useNavigate();

    function onclick(){
            if (role === "user") {
                navigate("/user/UserDashboard");
            } else if (role === "admin") {
                navigate("/admin/AdminDashboard");
            }
    }
    async function handleSubmit(e) {

        e.preventDefault();
        try {

            const response = await api.post("/login", {
                email: email,
                password: password
            });

            localStorage.setItem("token", response.data.token);
            const userRole = response.data.role ?? response.data.user?.role;
            localStorage.setItem("role", response.data.role);

            if (response.data.otpauth_url) {
            setQrCode(response.data.otpauth_url);
            setSecret(response.data.secret);
            setRole(userRole);
            } else {
            if (userRole === "admin") {
                navigate("/admin/AdminDashboard");
            } else if (userRole === "user") {
                navigate("/user/UserDashboard");
            } else {
                setError("User role was not found.");
            }
        }
        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <div className="auth-logo">
                        B
                    </div>

                    <h1>Welcome Back</h1>

                    <p>
                        Login to your account to continue
                    </p>

                </div>


                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>


                    {!qrCode && (
                        <button
                            type="submit"
                            className="auth-button"
                        >
                            Login
                        </button>
                    )}


                    {Error && (

                        <div className="error-message">
                            {Error}
                        </div>

                    )}

                </form>


                {qrCode && (

                    <div className="qr-section">

                        <h2>
                            Two-Factor Authentication
                        </h2>

                        <p>
                            Scan this QR code using your
                            authenticator application.
                        </p>

                        <div className="qr-code">
                            <QRCodeSVG value={qrCode} />
                        </div>

                        <p className="secret-label">
                            Or enter this secret key manually:
                        </p>

                        <div className="secret-key">
                            {secret}
                        </div>

                        <button className="auth-button" onClick={onclick}> continue</button>

                    </div>

                )}


                {!qrCode && (
                <>
                    <div className="auth-footer">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">
                                Register
                            </Link>
                        </p>
                    </div>

                    <div className="auth-footer">
                        <p>
                            <Link to="/ForgotPassword">
                                Forgot password
                            </Link>
                        </p>
                    </div>
                </>
            )}
            </div>

        </div>
    );
}

export default Login;

