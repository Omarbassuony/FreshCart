import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Style from './Register.module.css';
import { UserContext } from "../../context/userContext";

export default function Register() {
  let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const register = yup.object({
    name: yup.string().required("name is required").min(3, "name must be at least 3").max(25, "name must be less than 25"),
    email: yup.string().email("email is invalid").required("email is required"),
    phone: yup.string().required("phone is invalid").matches(/^01[0125][0-9]{8}$/, "phone must be valid Egyptian number"),
    password: yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,12}$/, "password must start with Uppercase and at minimum 5"),
    rePassword: yup.string().required("repassword is required").oneOf([yup.ref("password")], "repassword and password must be same")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
    validationSchema: register,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    setApiError(null);
    setIsLoading(true);
    axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      values)
      .then((apiResponse) => {
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setIsLoading(false);
          setUserLogin(apiResponse.data.token);
          formik.resetForm();
          navigate("/login");
        }
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        setApiError(apiResponse?.response?.data?.message);
      });
  }

  return (
    <>
      <div className="container flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      {apiError ? (<div className="p-2 w-full md:w-[800px] my-2 text-sm text-red-800 rounded-lg bg-red-100">
              {apiError}
            </div>) : null}
        <h1 className="font-bold text-xl text-green-600 mb-2">Register Now</h1>
        <form className="flex flex-col gap-3 w-full md:w-[800px]" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            placeholder="name"
            className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
            autoComplete="off"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="p-2 mt-3 text-sm text-red-800 rounded-lg bg-red-100">
              {formik.errors.name}
            </div>
          ) : ""}
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            className="md:w-[800px] rounded-md bg-gray-50  outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
            autoComplete="off"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="p-2 mt-3 text-sm text-red-800 rounded-lg bg-red-100">
              {formik.errors.email}
            </div>
          ) : ""}
          <label htmlFor="phone">phone</label>
          <input
            id="phone"
            type="phone"
            placeholder="phone"
            className="md:w-[800px] rounded-md bg-gray-50  outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
            autoComplete="off"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="p-2 mt-3 text-sm text-red-800 rounded-lg bg-red-100">
              {formik.errors.phone}
            </div>
          ) : ""}
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            className="md:w-[800px] rounded-md bg-gray-50  outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
            autoComplete="off"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="p-2 mt-3 text-sm text-red-800 rounded-lg bg-red-100">
              {formik.errors.password}
            </div>
          ) : ""}
          <label htmlFor="repassword">repassword</label>
          <input
            id="repassword"
            type="password"
            placeholder="rePassword"
            className="md:w-[800px] rounded-md bg-gray-50  outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
            autoComplete="off"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="p-2 mt-3 text-sm text-red-800 rounded-lg bg-red-100">
              {formik.errors.rePassword}
            </div>
          ) : ""}
          <div className="flex items-end flex-col">
            <button type="submit" className="rounded-md px-4 py-1 bg-green-600 text-white hover:bg-green-800">
              {isLoading ? (<i className="fa-solid fa-spinner fa-spin"></i>) : "Register"}
            </button>
            <Link to="/login" className="text-sm mt-1 block hover:text-green-600">I already have an account!</Link>
          </div>
        </form>
      </div>
    </>
  );
}
