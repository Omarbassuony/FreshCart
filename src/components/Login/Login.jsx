import axios from "axios";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Login() {
    const { setUserLogin, setUserName } = useContext(UserContext);
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loginSchema = yup.object({
        email: yup.string().email("email is invalid").required("email is required"),
        password: yup.string().required("password is required").min(6, "password must be at least 6").max(25, "password must be less than 25"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        setApiError(null);
        setIsLoading(true);
        axios.post(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            values
        ).then((apiResponse) => {
            if (apiResponse.data.message === "success") {
                const { token, user } = apiResponse.data;
                localStorage.setItem("userToken", token);
                localStorage.setItem("userName", user.name);
                setUserLogin(token);
                setUserName(user.name);
                formik.resetForm();
                navigate("/");
            }
            setIsLoading(false);
        }).catch((apiResponse) => {
            setIsLoading(false);
            setApiError(apiResponse?.response?.data?.message);
        });
    }

    return (
        <div className="container flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
            {apiError && (
                <div className="p-2 w-full md:w-[800px] my-2 text-sm text-red-800 rounded-lg bg-red-100">
                    {apiError}
                </div>
            )}
            <h1 className="font-bold text-xl text-green-600 mb-2">Login Now</h1>
            <form className="flex flex-col gap-2 w-full md:w-[800px]" onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
                    autoComplete="off"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                    <div className="p-2 mt-3 text-sm text-red-800 rounded-lg bg-red-100">
                        {formik.errors.email}
                    </div>
                )}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
                    autoComplete="off"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                    <div className="p-2 mt-3 text-sm text-red-800 rounded-lg bg-red-100">
                        {formik.errors.password}
                    </div>
                )}
                <Link to="/forgetpassword" className="text-center my-3 hover:text-green-600">forget your password <i className="fa-solid fa-lock"></i></Link>
                <div className="flex items-end flex-col">
                    <button type="submit" className="rounded-md px-4 py-1 bg-green-600 hover:bg-green-800 text-white">
                        {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        ) : "Login"}
                    </button>
                    <Link to="/register" className="text-sm mt-1 block hover:text-green-600">I don't have an account!</Link>
                </div>
            </form>
        </div>
    );
}
