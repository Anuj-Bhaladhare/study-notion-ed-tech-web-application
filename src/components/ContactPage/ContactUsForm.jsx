import React, { useState } from "react";
import {useForm} from "react-hook-form";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {} = useForm();

    const submitContactForm = () => {

    }
    
    return(
        <form onSubmit={handleSubmit(submitContactForm)}>
           <div>
              <div>
                {/* first Name */}
                <div>
                    <label></label>
                    <input />
                </div>

                {/* last Name */}
                <div>
                    <label></label>
                    <input />
                </div>
              </div>

              {/* email */}
              <div>
                <label htmlFor=""></label>
                <input />
                {
                    <span>
                        Please enter your email address
                    </span>
                }
              </div>

              {/* Phone Number */}
              <div>
                <label>Phone Number</label>
                <div>
                    {/* dropdown */}
                    <select>
                        {

                        }
                    </select>

                    <input />
                </div>
                {
                    <span>{}</span>
                }
              </div>

              {/* message */}
              <div>
                <label htmlFor=""></label>
                <textarea />
                {
                    <span>PLease enter your message.</span>
                }
              </div>
              <button>
                 Send Message
              </button>
           </div>
        </form>
    )
}

export default ContactUsForm;