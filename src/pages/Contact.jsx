import React from "react"
import Footer from "../components/common/Footer";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactForm from "../components/ContactPage/ContactForm";
 
const Contact = () => {
    return(
        <div>
           {/* Section 1 */}
           <div>
                {/* Contact Details */}
                <div>
                    <ContactDetails />
                </div>
                {/* Contact Form */}
                <div>
                    <ContactForm />
                </div> 
           </div>

           {/* Section 2 */}
           <div>
                {/* Reviws from Other Learner */}
                <h1>Review From other learning</h1>
                <div>
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