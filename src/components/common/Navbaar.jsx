import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation } from "react-router-dom"; // Changed `matchPath` to `useLocation`
import { NavbarLinks } from "../../data/navbar-links";

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
    const location = useLocation(); // Added to get the current location

    const matchRoute = (route) => {
        return !!location.pathname.match(route); // Changed `matchPath` to match the current location
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

                </div>

            </div>
        </div>
    );
};

export default Navbar;
