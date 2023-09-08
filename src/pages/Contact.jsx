import React from "react"
import Footer from "../components/common/Footer";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactForm from "../components/ContactPage/ContactForm";
 
const Contact = () => {
    return(
        <div>
           {/* Section 1 */}
           <div className="mx-auto mt-20 flex-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
                {/* Contact Details */}
                <div className="lg:w-[40%]">
                    <ContactDetails />
                </div>
                {/* Contact Form */}
                <div className="lg:w-[60%]">
                    <ContactForm />
                </div> 
           </div>

           {/* Section 2 */}
           <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Reviws from Other Learner */}
                <h1>Review From other learning</h1>
                <div className="text-center text-4xl font-semibold mt-8">
                    {/* <ReviewSlider /> */}
                </div>
           </div>

           {/* Section 3 */}
           <div>
             <Footer />
           </div>
        </div>
    )
}

export default Contact;