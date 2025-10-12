import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddRecipeForm = () => {
    // State to hold form data (Title, Ingredients, Steps)
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        steps: '',
    });

    // State to hold validation errors and submission status
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // --- Validation Logic ---
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.title.trim()) {
            tempErrors.title = 'Recipe title is required.';
            isValid = false;
        }

        if (!formData.ingredients.trim()) {
            tempErrors.ingredients = 'Ingredients list is required.';
            isValid = false;
        } else if (formData.ingredients.split('\n').filter(item => item.trim() !== '').length < 2) {
             // Ensures ingredients list has at least two non-empty items
             tempErrors.ingredients = 'Please list at least two ingredients (on separate lines).';
             isValid = false;
        }

        if (!formData.steps.trim()) {
            tempErrors.steps = 'Preparation steps are required.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Handle input changes, clearing errors as user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(false);

        if (validate()) {
            // In a real application, you would send formData to an API here
            console.log('Recipe Data Submitted:', formData);
            
            // Reset form and show success message
            setFormData({ title: '', ingredients: '', steps: '' });
            setIsSubmitted(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => setIsSubmitted(false), 3000);
        } else {
            console.log('Form validation failed.');
        }
    };

    // --- JSX Form Structure and Tailwind Styling ---
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-10">
            
            {/* Back Button */}
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 text-lg mb-6 inline-flex items-center">
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Home
            </Link>

            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                Submit Your Recipe 🍽️
            </h1>
            
            {/* Submission Success Message */}
            {isSubmitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-center" role="alert">
                    <span className="block sm:inline">Recipe submitted successfully! Check your console for the data.</span>
                </div>
            )}

            {/* Form Container: Responsive Shadow and Background */}
            <form 
                onSubmit={handleSubmit} 
                className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200"
            >
                
                {/* 1. Recipe Title Field */}
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                        Recipe Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150`}
                        placeholder="e.g., Authentic Ghanaian Jollof"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                {/* 2. Ingredients Textarea */}
                <div className="mb-6">
                    <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700 mb-2">
                        Ingredients (List each item on a new line)
                    </label>
                    <textarea
                        name="ingredients"
                        id="ingredients"
                        rows="6"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150`}
                        placeholder="e.g., &#10;1 large onion&#10;2 cups of rice&#10;1 can of crushed tomatoes"
                    ></textarea>
                    {errors.ingredients && <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>}
                </div>

                {/* 3. Preparation Steps Textarea */}
                <div className="mb-8">
                    <label htmlFor="steps" className="block text-lg font-medium text-gray-700 mb-2">
                        Preparation Steps
                    </label>
                    <textarea
                        name="steps"
                        id="steps"
                        rows="8"
                        value={formData.steps}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.steps ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150`}
                        placeholder="e.g., &#10;1. Chop the onions and sauté in oil.&#10;2. Add tomato paste and fry for 5 minutes.&#10;3. Add washed rice and cook..."
                    ></textarea>
                    {errors.steps && <p className="mt-1 text-sm text-red-500">{errors.steps}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg text-lg 
                               hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-200"
                >
                    Submit Recipe
                </button>
            </form>
        </div>
    );
};

export default AddRecipeForm;