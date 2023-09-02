import React from "react";
import HighlightText from "./HighlightText";
import Instructor from "../../../assets/Images/Instructor.png";
import { FaArrowRight } from "react-icons/fa"
import CTAButton from "./Button";

const InstructorSection = () => {
    return(
        <div className="w-11/12 flex flex-row gap-9">
            <div>
                <img 
                src={Instructor} 
                alt="Instructor" 
                className=""
                />
            </div>

            <div className="flex flex-col text-start">
                <div className="text-4xl flex flex-col">
                    Become an 
                    <HighlightText text={"Instructor"}/>
                </div>
                <p>
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
    )
}

export default InstructorSection;