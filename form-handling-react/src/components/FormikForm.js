import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the validation schema using Yup
const RegistrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is required'), 
    
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),    

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'), 
});

const formikForm = () => {
    const [submissionMessage, setSubmissionMessage] = useState('');

    const mockApiSubmit = async (values, actions) => {

        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log('Formik Form Data Submitted:', values);
        
        setSubmissionMessage('Registration successful with Formik! (Data logged to console)');
        
        actions.resetForm();
        actions.setSubmitting(false);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #007bff', borderRadius: '5px' }}>
            <h2>Formik Registration Form</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validationSchema={RegistrationSchema}
                onSubmit={mockApiSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <Field name="username" type="text" />
                            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        </div>

                        {submissionMessage && <p style={{ color: 'green' }}>{submissionMessage}</p>}

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register with Formik'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default formikForm;