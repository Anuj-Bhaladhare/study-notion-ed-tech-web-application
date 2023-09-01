import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImg from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
       Logo: Logo1,
       heading: "Leadership",
       description: "Fully committed to the success company",
    },
    {
       Logo: Logo2,
       heading: "Leadership",
       description: "Fully committed to the success company",
    },
    {
       Logo: Logo3,
       heading: "Leadership",
       description: "Fully committed to the success company",
    },
    {
       Logo: Logo4,
       heading: "Leadership",
       description: "Fully committed to the success company",
    },
]
const TimelineSection = () => {

    return(
        <div className="w-11/12 justify-center flex flex-row gap-10">

            <div className="flex flex-col gap-5">
               {
                 timeline.map((elements, index) => {
                    return(
                        <div className="flex flex-row gap-6" key={index}>
                            <div>
                               <img src={elements.Logo} alt="logo" />
                            </div>
                            <div>
                                <h2>{elements.heading}</h2>
                                <p>{elements.description}</p>
                            </div>
                        </div>
                    )
                 })
               }
            </div>

            <div>

               <img src={timeLineImg} alt="timelineImage" className="shadow-white object-cover h-fit"/>

               <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[50%] translate-y-[50%]">
                  <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                    <p className="text-3xl font-bold">10</p>
                    <p className="text-caribbeangreen-300 text-ms">Year Experience</p>
                  </div>
                  <div className='flex gap-5 items-center px-7'>
                    <p className="text-3xl font-bold">250</p>
                    <p className="text-caribbeangreen-300 text-ms">Type of courses</p>
                  </div>
               </div>

            </div>

        </div>
    )
}

export default TimelineSection;