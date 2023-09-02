import React from "react";
import { useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    
    return(
        <div>
            <div>
                Unlock the
                <HighlightText text={"power of Code"}/>
            </div>

            <p>
                 Learn to build anything you can imagine   
            </p>

            <div className="">
                {
                    tabsName.map( (element, index) => {
                        return(
                            <div 
                            key={index}
                            className={`${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"}
                                       flex flex-row items-centerm gap-2 text-[16px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                            > {element} </div>    
                        )
                    })
                }
            </div>

            <div className="lg:h-[150px]"></div>
        </div>
    )
}

export default ExploreMore;