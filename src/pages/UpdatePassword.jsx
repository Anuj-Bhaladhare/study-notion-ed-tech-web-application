import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI"; 

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false); // Changed the variable name to showPassword for consistency.
  const { password, confirmPassword } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").slice(-1)[0]; // Fixed the token extraction.
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div>
          <h1>Choose a new password</h1>
          <p>Almost done. Enter your new password, and you're all set.</p>
          <form onSubmit={handleOnSubmit}>
            <label>
              <p>Password<sup>*</sup></p>
              <input
                required
                type={showPassword ? "text" : "password"} // Fixed the type attribute.
                name="password"
                value={password}
                placeholder="Enter Password"
                onChange={handleOnChange}
                className="form-style w-full !pr-10"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>
            <label>
              <p>Confirm Password<sup>*</sup></p>
              <input
                required
                type={showPassword ? "text" : "password"} // Fixed the type attribute.
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full !pr-10"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>
            <button type="submit">Submit</button>
            <Link to="/login">
              <p>
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
