import axios from 'axios';
import * as Yup from 'yup';
import {Field, ErrorMessage, Form, Formik} from "formik";
import {useState} from "react";
function Registration()
{
    const [isSubmitting,setIsSubmitting]=useState(false);
    const validationSchema=Yup.object({
        firstName:Yup.string().required("First Name is required"),
        lastName:Yup.string().required("Last Name is required"),
        email:Yup.string().required("email is required").email("Invalid email format"),
        phoneNo:Yup.string()
            .matches(/^\d{10}$/,"phone number must be 10 digits")
            .required(),
        password:Yup.string()
            .required("Password is required")
            .min(8,"Password must be at least 8 characters")
            .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,"Password must have at least one symbol")
            .matches(/^(?=.*[A-Z]).*$/,"Password must have at least once upper case letter")
            .matches(/^(?=.*[a-z]).*$/,"Password must have at least one lower case letter")

    });
    const initialValues={
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        phoneNo:''
    }
    const handleSubmit=async (values,{resetForm})=>
    {
        setIsSubmitting(true);
        console.log(values);
        try {
            const res=await axios.post("http://localhost:8080/api/auth/signup", values);
            if(res)
            {
                alert("form submitted successfully");
                resetForm();
            }
        }
        catch (err)
        {
            console.log(err);
            alert(err.message);
        }
        finally {
            setIsSubmitting(false);
        }


    }
    return(
        <div className='registration'>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {formikProps=>(
                <Form className="row g-3 custom-form">
                    <div className="col-md-6 ">
                        <label htmlFor="input1" className="form-label">First name</label>
                        <Field type='text' className='form-control' id='input1' name='firstName'/>
                        <ErrorMessage name='firstName' component='div' className='text-danger'/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="input2" className="form-label">Last name</label>
                        <Field type="text" className="form-control" id="input2" name='lastName'/>
                        <ErrorMessage name='lastName' component='div' className='text-danger'/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="input3" className="form-label">Email</label>
                        <Field type="text" className="form-control" id="input3" name='email'/>
                        <ErrorMessage name='email' component='div' className='text-danger'/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="input4" className="form-label">Password</label>
                        <Field type="password" className="form-control" id="input4" name='password'/>
                        <ErrorMessage name='password' component='div' className='text-danger'/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="input5" className="form-label">Phone No</label>
                        <Field type="tel" className="form-control" id="input5" name='phoneNo'/>
                        <ErrorMessage name='phoneNo' component='div' className='text-danger'/>
                    </div>
                    <div className="col-md-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck2"/>
                            <label className="form-check-label" htmlFor="invalidCheck2">
                                Agree to terms and conditions
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" disabled={isSubmitting || !formikProps.isValid}>Signup</button>
                    </div>
                </Form>
            )}

        </Formik>
        </div>


    );

}
export default Registration;