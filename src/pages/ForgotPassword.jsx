import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState();
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return(
        <div className="grig ">
            {
                loading ?
                (
                    <div className="custom-loader"></div>
                ) :
                (
                   <div>

                       <h1>
                        {
                            !emailSent ? "Reset your password" : "Check email"
                        }
                       </h1>

                       <p>
                        {
                            !emailSent ? 
                            "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : 
                            `We have sent the reset email to ${email}`
                        }
                       </p>

                       <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && 
                            (
                                <label>
                                    <p>Email Address<sup>*</sup></p>
                                    <input 
                                      required
                                      type="email"
                                      name="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      placeholder="Enter Your Email"
                                      className="form-style w-full text-black"
                                    />
                                </label>
                            )
                        }
                        <button>
                            {
                                !emailSent ? "Submit" : "Resend Email"
                            }
                        </button>
                       </form>

                       <div>
                        <Link to="/login">
                          <p>
                            <BiArrowBack /> Back To Login
                          </p>
                        </Link>
                       </div>

                   </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;