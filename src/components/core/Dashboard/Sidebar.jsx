import React from "react"
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
 
const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
    );
    return(
        <div>
            <div>
                {

                }
            </div>
            <div />
            <div>
                <SidebarLink />
                <button onClick={() => {
                    text1: "Are you sure?",
                }}>
                    <div>
                     <VscSignOut />
                     <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {}
    )
}

export default Sidebar;
