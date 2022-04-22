import React from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";

function Email(props) {
    const formik = useFormik({
        initialValues: {
            sendTo: '',
            title: '',
            mess: '',
        },
        validationSchema: Yup.object({
            sendTo: Yup.string().email('Invalid email').required('Required!'),
            title: Yup.string().required('Required!'),
            mess: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log(values);
            alert('Form is sent successfully');
        }
    });

    return(
        <form onSubmit={formik.handleSubmit}>
            <div>
                To <br/>
                <input 
                    name="sendTo"
                    type='email' 
                    value={formik.values.sendTo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.sendTo && formik.errors.sendTo ? (
                    <p>{formik.errors.sendTo}</p>
                ) : (
                    null
                )}
            </div>
            <div>
                Title <br/>
                <input 
                    name="title"
                    type='title' 
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                    <p>{formik.errors.title}</p>
                ) : (
                    null
                )}
            </div>
            <div>
                Mess <br/>
                <textarea
                    cols='15' 
                    rows='4'
                    name="mess"
                    type='mess' 
                    value={formik.values.mess}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.mess && formik.errors.mess ? (
                    <p>{formik.errors.mess}</p>
                ) : (
                    null
                )}
            </div>
            <div>
                <input type='file'/>
            </div>
            <input type='submit' value='Submit'/>
        </form>
    )
}

export default Email;