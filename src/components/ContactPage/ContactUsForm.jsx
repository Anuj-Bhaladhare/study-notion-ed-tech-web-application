import React, { useEffect, useState } from "react";
import {set, useForm} from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            const responce = {status: "OK"};
            console.log("Logging responce", responce);
            setLoading(false)
        }
        catch(error){
            console.log("Error", error);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful){
           reset({
               email: "",
               firstname: "",
               lastname: "",
               message: "",
               phoneNo: ""
           })
        }
    }, [reset, isSubmitSuccessful])
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
                    <select 
                      name="dropdown" 
                      id="dropdown" 
                      className="bg-yellow-50 w-[80px]"
                      {...register("countrycode", {required: true})}  
                    >
                        {
                            CountryCode.map( (element, index) => {
                                return(
                                    <option key={index} value={element.code}>
                                        {element.code} -{element.country}
                                    </option>
                                )
                            })
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