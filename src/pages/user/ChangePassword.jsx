import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "../../styles/user.css";
// import "../../styles/auth.css";
export default function ChangePassword(){

    const navigate = useNavigate();
    const [errors,setError]=useState("");
    const [current_password,setCurrent_password]=useState("");
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    // const [message,setMessage]=useState("");


    async function handelsubmit(e){
        e.preventDefault()
        // setMessage("")
        setError("")
        try{
            const response=await api.post("/user/change-password",{
                current_password:current_password,
                password:password,
                password_confirmation:confirmpassword
            })
        // setMessage(response.data.message)  
        alert(response.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login")
        }
        catch(error){
            setError(error.response?.data?.message ||
    "Failed to change password")
        }
    }



    // return(
    //     <form action="" onSubmit={handelsubmit}>
    //         <label htmlFor="current_password">current password</label> <input type="password" name="" id="current_password" value={current_password} onChange={
    //             (e)=>{
    //             setCurrent_password(e.target.value)
    //             }
    //         }/>
    //     <br />
    //     <label htmlFor="new_password">new password</label> <input type="password" name="" id="new_password" value={password} onChange={
    //         (e)=>{
    //             setPassword(e.target.value)
    //             }
    //     }/>
    //     <br />
    //     <label htmlFor="cinfimepassword">confirm password</label> <input type="password" name="" id="cinfimepassword" value={confirmpassword} onChange={
    //         (e)=>{
    //             setConfirmpassword(e.target.value)
    //             }
    //     }/>
    //     <button type="submit">
    //         Change Password
    //     </button>

    //     {errors && ( <p style={{ color: "red" }}> {errors} </p> )}
    //     {/* {message && ( <p style={{ color: "green" }}> {message} </p> )} */}
    //     </form>
    // )

return (

    <div className="user-page">

        <div className="page-header">

            <div>
                <h1>Change Password</h1>

                <p>
                    Update your account password.
                </p>
            </div>

        </div>


        <div className="form-card">

            <div className="form-card-header">

                <div className="form-icon">
                    🔐
                </div>

                <div>
                    <h2>Security Settings</h2>

                    <p>
                        Enter your current password and choose
                        a new password.
                    </p>
                </div>

            </div>


            <form
                onSubmit={handelsubmit}
                className="user-form"
            >

                <div className="form-group">

                    <label htmlFor="current_password">
                        Current Password
                    </label>

                    <input
                        type="password"
                        id="current_password"
                        value={current_password}
                        onChange={(e) =>
                            setCurrent_password(
                                e.target.value
                            )
                        }
                        placeholder="Enter current password"
                    />

                </div>


                <div className="form-group">

                    <label htmlFor="new_password">
                        New Password
                    </label>

                    <input
                        type="password"
                        id="new_password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter new password"
                    />

                </div>


                <div className="form-group">

                    <label htmlFor="cinfimepassword">
                        Confirm New Password
                    </label>

                    <input
                        type="password"
                        id="cinfimepassword"
                        value={confirmpassword}
                        onChange={(e) =>
                            setConfirmpassword(
                                e.target.value
                            )
                        }
                        placeholder="Confirm new password"
                    />

                </div>


                {errors && (

                    <div className="error-message">
                        {errors}
                    </div>

                )}


                <button
                    type="submit"
                    className="primary-button full-width"
                >
                    Change Password
                </button>

            </form>

        </div>

    </div>
);

}