import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-hot-toast';

export default function VerifyCode() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    const validationSchema = yup.object({
        resetCode: yup.string().required("Reset code is required").min(4, "Reset code is invalid"),
    });

    const formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema,
        onSubmit: verifyCode,
    });

    function verifyCode(values) {
        setApiError(null);
        setIsLoading(true);
        axios.post(
            `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
            values
        ).then((apiResponse) => {
            console.log(apiResponse);
            if (apiResponse.status === 200) {
                localStorage.setItem("verifyCode", apiResponse.status);
                toast.success("verify code is correct", {
                    duration: 1500,
                    position: 'top-center'
                });
                navigate("/resetpassword");
            }
            setIsLoading(false);
        }).catch((apiResponse) => {
            setIsLoading(false);
            setApiError(apiResponse?.response?.data?.message);
        });
    }

    return (
        <div className="container flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="font-bold text-xl text-green-600 mb-2">Please enter your verification code</h1>
            <form className="flex flex-col w-full md:w-[500px]" onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    className="md:w-[500px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
                    autoComplete="off"
                    name="resetCode" 
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.resetCode && formik.touched.resetCode && (
                    <div className="p-2 md:w-[500px] my-2 text-sm text-red-800 rounded-lg bg-red-100">
                        {formik.errors.resetCode}
                    </div>
                )}
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
