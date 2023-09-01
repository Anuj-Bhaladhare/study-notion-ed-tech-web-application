import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import banner from "../assets/Images/banner.mp4";

import CTAButton from "../components/core/homePage/Button";
import HighlightText from "../components/core/homePage/HighlightText";
import CodeBlocks from "../components/core/homePage/CodeBlocks";
import LearningLanguageSection from "../components/core/homePage/LearningLanguageSection";
import TimelineSection from "../components/core/homePage/TimelineSection";
import ExploreMore from "../components/core/homePage/ExploreMore";
import InstructorSection from "../components/core/homePage/InstructorSection";

const Home = () => {
    return(
        <div>
           {/* Section 1 */}
            <div className="relative flex flex-col items-center mx-auto w-11/12 max-w-maxContent text-white justify-between">

                <Link to={"/singup"}>
                   <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                   </div>
                </Link>

                <div className="text-center text-4xl font-semibold mt-7">
                   Empower Your Future With
                   <HighlightText text={"Coding Skills"}/>
                </div>

                <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
                   With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className="flex flex-row gap-7 mt-8 cursor-pointer">
                  <CTAButton active={true} linkto={"/singup"}>
                    Learn More
                  </CTAButton>

                  <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                  </CTAButton>
                </div>

                <div className="mt-5">
                  <video autoPlay loop muted>
                    <source src={banner} type="video/mp4"/>
                  </video>
                </div>

                {/* Code Section 1 */}
                <div>
                  <CodeBlocks
                     position={"lg:flex-row"}
                     heading={
                      <div className="text-4xl font-semibold">
                        Unlock Your
                        <HighlightText text={"coding potential "} />
                        with our online courses
                      </div>} 
                     subheading={
                      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                     } 
                     ctabtn1={
                      {
                        btntext: "Try It Yourself",
                        linkto: "/singup",
                        active: true,
                      }                    
                    } 
                     ctabtn2={
                      {
                        btntext: "Lern More",
                        linkto: "/login",
                        active: false,
                      } 
                     } 
                     codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`} 
                     codecolor={"text-yellow-25"} 
                  />
                </div>

                {/* Code Section 2 */}
                <div>
                  <CodeBlocks
                     position={"lg:flex-row-reverse"}
                     heading={
                      <div className="text-4xl font-semibold">
                        Unlock Your
                        <HighlightText text={"coding potential "} />
                        with our online courses
                      </div>} 
                     subheading={
                      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                     } 
                     ctabtn1={
                      {
                        btntext: "Try It Yourself",
                        linkto: "/singup",
                        active: true,
                      }                    
                    } 
                     ctabtn2={
                      {
                        btntext: "Lern More",
                        linkto: "/login",
                        active: false,
                      } 
                     } 
                     codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`} 
                     codecolor={"text-yellow-25"} 
                  />
                </div>

                <ExploreMore />
            </div>

           {/* Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">

                <div className="homepage_bg h-[310px]">

                  <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                    <div className="h-[150px]"></div>
                    <div className="flex flex-row gap-7 text-white">
                      <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex flex-row items-center gap-3"> 
                          Explore Full Catalog
                          <FaArrowRight />
                        </div>
                      </CTAButton>
                      <CTAButton active={false} linkto={"/login"}>
                          <div>
                            Learn More
                          </div>
                      </CTAButton>
                    </div>
                  </div>
                </div>

                <div className="w-11/12 max-w-maxContent flex flex-row items-center justify-between gap-7 mx-auto">

                  <div className="flex flex-row gap-7 mb-10 mt-[95px]">

                      <div className="text-4xl font-semibold max-w-[45%]">
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"}/>
                      </div>

                      <div className="flex flex-col gap-10 max-w-[40%] item-start">
                        <div className="text-[16px]">
                          The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/login"}>
                          <div>Lern More</div>
                        </CTAButton>
                      </div>

                  </div>

                  <TimelineSection />

                  <LearningLanguageSection />

                </div>
            </div>

           {/* Section 3 */}
           <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
              <InstructorSection />
             <h2 className="text-center text-4xl font-semobold mt-10">review from Other Learners</h2>
           </div>

           {/* Footer */}
           <Footer />

        </div>
    )
}

export default Home;