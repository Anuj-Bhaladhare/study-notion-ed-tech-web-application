import React from "react";
import LoginForm from "./LoginForm";
import SingupForm from "./SingupForm";
import frameImage from "../../../assets/Images/frame.png";


 const Template = (title, description1, description2, image, formType) => {
    return(
        <div>
            {/* section 1 */}
            <div>
                <h1>
                    {title}
                </h1>
                <div>
                    <p>{description1}</p>
                    <p>{description2}</p>
                </div>
                <div>
                    <button>
                        Student
                    </button>
                    <button>
                        Instructor
                    </button>
                </div>
                <div>
                    {
                        formType === "signup" ? (<SingupForm />) : (<LoginForm />)
                    }
                </div>
                <div>
                    {
                        formType === "signup" ? 
                        (
                            <button>
                                Create Accounr
                            </button>
                        ) : 
                        (
                            <button>
                                Sing In
                            </button>
                        )
                    }
                </div>

            </div>

            {/* Section */}
            <div>

              <div>
                <img 
                    src={frameImage} 
                    alt="frameImage"
                    className="" />
              </div>

              <div>
                <img 
                    src={image} 
                    alt="image"
                    className="" />
              </div>
              
            </div>
        </div>
    )
 }

 export default Template;
