import React from "react";
import HighlightText from "./HighlightText";
import Instructor from "../../../assets/Images/Instructor.png";
import { FaArrowRight } from "react-icons/fa"
import CTAButton from "./Button";

const InstructorSection = () => {
    return(
        <div className="mt-16">
            <div className="flex flex-row gap-20 items-center">
                <div className="w-[50%]">
                    <img 
                    src={Instructor} 
                    alt="Instructor" 
                    className="shadow-white"
                    />
                </div>

                <div className="w-[50%] flex flex-col gap-10">
                    <div className="text-4xl font-semobold w-[50%]">
                        Become an 
                        <HighlightText text={"Instructor"}/>
                    </div>
                    <p className="font-medium text-[16px] w-[80%] text-richblack-300">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/singup"}>
                            <div className="flex flex-row items-center gap-2">
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection;