import React from 'react'
import { useForm } from 'react-hook-form'
import { MdAddCircleOutline } from "react-icons/md"

const CourseBuilderForm = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  return (
    <div>
      <p>Course Builder</p>
      <form>
        <div>
          <label>Section Name<sup>*</sup></label>
          <input 
            id='sectionName'
            placeholder='add section name'
            {...register("sectionName", {required: true})}
            className='w-full'
            />
            {errors.sectionName && (
               <span>Section Name is required</span>
            )}
        </div>
        <div>
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit section name" : "create section"}
            outLine={true}
          >
             <MdAddCircleOutline className='text-yellow-50' size={20}/>
          </IconBtn>
          {
            editSectionName && (
              <button
                type='button'
                onClick={cancleEdit}
                className='text-ms text-richblack-300 underline ml-10'
              >
                Cancle Edit
              </button>
            )
          }
        </div>
      </form>
    </div>
  )
}

export default CourseBuilderForm