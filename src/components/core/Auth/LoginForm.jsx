import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

 const LoginForm = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })

    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
      }

    return(
        <form onSubmit={handleOnSubmit} className="">

            <label>
                <p>Email Address<sup>*</sup></p>
                <input 
                  required
                  type="text"
                  name="email"
                  onChange={handleOnChange}
                  value={email}
                  placeholder="Enter Email Eddress"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className=""
                />
            </label>

            <label>
               <p>Password<sup>*</sup></p> 
               <input 
                 required
                 type="password"
                 placeholder="Enter Your Password"
                 value={password}
                 onChange={handalOnSubmit}
                 style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                 }}
                />
                <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer"> 
                   {
                    showPassword ? 
                    (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) :
                    (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                   }
                </span>
                <Link to="/forgot-password">
                  <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                    Forgot Password
                  </p>
                </Link>
            </label>

            <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Sign In
            </button>
        </form>
    )
 }

 export default LoginForm;