import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apis";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";


const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-development"
    },
];

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const location = useLocation();

    const [ssubLinks, setSsubLinks] = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result);
            setSsubLinks(result.data.data);
        }
        catch(error){
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        fetchSublinks();
    }, []);

    const matchRoute = (route) => {
        return !!location.pathname.match(route); 
    };

    return (
        <div className="flex items-center justify-center text-white">
            <div className="flex w-11/12 items-center justify-between">
                <Link to="/">
                    <img src={Logo} alt="" loading="lazy" />
                </Link>

                <nav>
                    <ul className="flex flex-row gap-3">
                        {NavbarLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <div className="relative flex items-center gap-2 group">
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle />

                                            <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblue-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[45%] h-6 w-6 rotate-45 rounded bg-richblack-5">
                                                    {
                                                        subLinks.map( (sublink, index) => {
                                                            return(
                                                                <div key={index}>
                                                                    <Link to={`${sublink.path}`}>
                                                                         <p>{sublink.title}</p>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link.path}>
                                            <p
                                                className={`${
                                                    matchRoute(link.path)
                                                        ? "text-yellow-25"
                                                        : "text-richblack-25"
                                                }`}
                                            >
                                                {link.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Login / SingUp / dashboard */}
                <div>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart">
                               <AiOutlineShoppingCart />
                               {
                                  totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                  )
                               }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                               <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                   Sing Up
                               </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;
