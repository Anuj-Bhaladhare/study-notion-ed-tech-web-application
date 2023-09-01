import react from "react";
import { Link } from "react-router-dom";

const Button = ({children, active, linkto}) => {
    return(
        <Link to={linkto}>
            <div className={`${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}`}>
              {children}
            </div>
        </Link>
    )
}

export default Button;