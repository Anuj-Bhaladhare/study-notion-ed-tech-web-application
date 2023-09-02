import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation } from "react-router-dom"; // Changed `matchPath` to `useLocation`
import { NavbarLinks } from "../../data/navbar-links";

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
                                        <div>{/* You can add content here if needed */}</div>
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
            </div>
        </div>
    );
};

export default Navbar;
