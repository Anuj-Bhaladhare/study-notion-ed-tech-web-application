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
                    <label htmlFor="firstname">First Name</label>
                    <input 
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="enter first name"
                      className="text-black"
                      {...register("firstname", {require: true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* last Name */}
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input 
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Enter Last Name"
                      className="text-black"
                    />
                </div>
              </div>

              {/* email */}
              <div>
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter email"
                  className="text-black"
                  {...register("email", {require: true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )  
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

                    <input 
                      type="number"
                      name="phonenumber"
                      id="phonenumber"
                      placeholder="12345 67890"
                      className="text-black  w-[calc(100%-90px)]"
                      {...register("phoneNo", {
                        required:{value:true, message:"Please enter Phone Number"},
                        maxLength: {value:10, message:"Invalid Phone Number"},
                        minLength:{value:8, message:"Invalid Phone Number"}
                      })}
                    />
                </div>
                {
                    errors.phoneNo && (
                        <span>{errors.phoneNo.message}</span>
                    )      
                }
              </div>

              {/* message */}
              <div>
                <label htmlFor=""></label>
                <textarea 
                  name="message"
                  id="message"
                  cols="30"
                  rows="7"
                  className="text-black"
                  placeholder="Enter Your message here"
                  {...register("message", {require: true})}
                />
                {
                    errors.message && (
                        <span>PLease enter your message.</span>
                    )       
                }
              </div>
              <button type="submit" className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'>
                 Send Message
              </button>
           </div>
        </form>
    )
}

export default ContactUsForm;