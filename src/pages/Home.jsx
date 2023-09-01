import react from "react";
import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa"
import HighlightText from "../components/core/homePage/HighlightText";
import CTAButton from "../components/core/homePage/Button";

const Home = () => {
    return(
        <div>
           {/* Section 1 */}
            <div className="flex flex-col items-center mx-auto">
                <Link to={"/singup"}>
                   <div>
                        <div className="flex flex-row items-center gap-2">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                   </div>
                </Link>

                <div>
                   Empower Your Future With
                   <HighlightText text={"Coding Skills"}/>
                </div>

                <div>
                   With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className="flex flex-row gap-5 cursor-pointer">
                  <CTAButton active={true} linkto={"/singup"}>
                    Learn More
                  </CTAButton>

                  <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                  </CTAButton>
                </div>

                <div>
                  *******************************
                </div>

                {/* Code Section 1 */}
                <div>
                  *******************************
                </div>

                {/* Code Section 2 */}
                <div>
                  *******************************
                </div>

            </div>

           {/* Section 2 */}


           {/* Section 3 */}


           {/* Footer */}


        </div>
    )
}

export default Home;