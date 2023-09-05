import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../services/operations/authAPI";

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const {signupData, loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect( () => {
        if(!signupData){
            navigate("/signup")
        }
    }, []);

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(
            sendOtp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        )
    }

    return(
        <div>
            {
                loading ?
                (
                   <div className="custom-loader"></div>
                ) : (
                   <div>
                      <h1>
                        Verify Email
                      </h1>

                      <p>
                        A verification code has been sent to you. Enter the code below
                      </p>

                      <form onSubmit={handleVerifyAndSignup}>
                        <OTPInput 
                           value={otp}
                           onChange={setOtp}
                           numInputs={6}
                           renderInput={(props) => (
                            <input 
                              {...props} 
                              placeholder="-"
                              style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className=""
                            />
                           )}
                           containerStyle={<span>-</span>}
                        />
                        <button type="submit">
                            Verify Email
                        </button>
                      </form>

                      <div>
                        <Link to="/signup">
                           <p>
                              <BiArrowBack /> Back To Signup
                           </p>
                        </Link>

                        <button onClick={() => dispatch(sendOtp(signupData.email))}>
                            <RxCountdownTimer />
                            Resend it
                        </button>
                      </div>
                   </div>
                )              
            }
        </div>
    )
}

export default VerifyEmail;