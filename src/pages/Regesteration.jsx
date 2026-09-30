// import { useState } from "react";
// import api from "../api/axios";
// import { Link } from "react-router-dom";

// export default function Regesteration(){
// const[full_name,setFull_nume]=useState("");
// const[phone_number,setPhone_number]=useState("");
// const[email,setEmail]=useState("");
// const[password,setPassword]=useState("");
// const[confirm,setConfirm]=useState("");
// const [Error, setError] = useState([]);
// const[succees,setSuccess]=useState("");


// async function handelsubmit(e){
// e.preventDefault()
// setError([]);
// setSuccess("");
// try{
// const response= await api.post("/register",{
// full_name:full_name,
// email:email,
// phone_number:phone_number,
// password:password,
// password_confirmation:confirm
// });
// setSuccess(response.data.message)
// }catch(error){
//     const errors = error.response.data.errors;
//     const allErrors = Object.values(errors).flat();
//     setError(allErrors);
// }
// }
// return(
//     <form onSubmit={handelsubmit}>
//     <label htmlFor="fallname">Full name</label> <input type="text" name="" id="fallname" value={full_name} onChange={(e)=>{setFull_nume(e.target.value)}}/>
//     <br /><br />
//     <label htmlFor="phonenumber">Phone number</label><input type="text" name="" id="phonenumber" value={phone_number}  onChange={(e)=>{setPhone_number(e.target.value)}}/>
//     <br /><br />
//     <label htmlFor="email">Email</label><input type="email" name="" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
//     <br /><br />
//     <label htmlFor="password">password</label><input type="password" name="" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
//     <br /><br />
//     <label htmlFor="confirmpassword">confirm password</label><input type="password" name="" id="confirmpassword" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}}/>
//     <br /><br />
//     <button type="submit">regester</button> <br /> <p>
//     Already have an account?
//     <Link to="/login">Login</Link>
// </p>
//     <br /><br /><br />

//     {Error.length === 0
//     ? succees && (
//         <p style={{ color: "green" }}>
//             {succees}
//         </p>
//     ) 
//     :Error.map((message, index) => (
//         <p key={index} style={{ color: "red" }}>
//             {message}
//         </p>
//     ))    
// }
//     </form>
// )

// }




import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function Regesteration() {

    const [full_name, setFull_nume] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [Error, setError] = useState([]);
    const [succees, setSuccess] = useState("");


    async function handelsubmit(e) {

        e.preventDefault();

        setError([]);
        setSuccess("");

        try {

            const response = await api.post("/register", {

                full_name: full_name,
                email: email,
                phone_number: phone_number,
                password: password,
                password_confirmation: confirm

            });

            setSuccess(response.data.message);

        } catch (error) {

            const errors =
                error.response?.data?.errors || {};

            const allErrors =
                Object.values(errors).flat();

            setError(allErrors);
        }
    }


    return (

        <div className="auth-page">

            <div className="auth-card registration-card">

                <div className="auth-header">

                    <div className="auth-logo">
                        B
                    </div>

                    <h1>Create Account</h1>

                    <p>
                        Register to get started
                    </p>

                </div>


                <form
                    onSubmit={handelsubmit}
                    className="auth-form"
                >

                    <div className="form-group">

                        <label htmlFor="full_name">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="full_name"
                            placeholder="Enter your full name"
                            value={full_name}
                            onChange={(e) =>
                                setFull_nume(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="phone_number">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            id="phone_number"
                            placeholder="Enter your phone number"
                            value={phone_number}
                            onChange={(e) =>
                                setPhone_number(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="register_email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="register_email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="register_password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="register_password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="confirm_password">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirm_password"
                            placeholder="Confirm your password"
                            value={confirm}
                            onChange={(e) =>
                                setConfirm(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Create Account
                    </button>


                    {succees && (

                        <div className="success-message">
                            {succees}
                        </div>

                    )}


                    {Error.length > 0 && (

                        <div className="error-message">

                            {Error.map((message, index) => (

                                <p key={index}>
                                    {message}
                                </p>

                            ))}

                        </div>

                    )}

                </form>


                <div className="auth-footer">

                    <p>
                        Already have an account?
                        {" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}
