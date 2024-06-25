import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-hot-toast';

export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    const validationSchema = yup.object({
        email: yup.string().email("Email is invalid").required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: forgetPass,
    });

    function forgetPass(values) {
        setApiError(null);
        setIsLoading(true);

        axios.post(
            `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
            values
        ).then((apiResponse) => {
            console.log(apiResponse);
            if (apiResponse.data.statusMsg === "success") {
                toast.success("Reset code sent to your email", {
                    duration: 1500,
                    position: 'top-center'
                });
                navigate("/verifycode");
            }
            setIsLoading(false);
        }).catch((apiResponse) => {
            setIsLoading(false);
            setApiError(apiResponse?.response?.data?.message);
        });
    }

    return (
        <div className="container flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="font-bold text-xl text-green-600 mb-2">Please enter your verification email</h1>
            <form className="flex flex-col gap-2 w-full md:w-[800px]" onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
                    autoComplete="off"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-100">
                        {formik.errors.email}
                    </div>
                ) : null}
                {apiError && (
                    <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-100">
                        {apiError}
                    </div>
                )}
                <button
                    type="submit"
                    className="rounded-md block mx-auto px-4 py-1 my-4 bg-green-600 hover:bg-green-800 text-white"
                >
                    {isLoading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : "Verify"}
                </button>
            </form>
        </div>
    );
}
