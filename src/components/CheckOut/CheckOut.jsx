import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import * as yup from "yup";
import { toast} from 'react-hot-toast';

export default function CheckOut() {
  const { cart, setCart, setCartCount } = useContext(CartContext);
  const [orderType, setOrderType] = useState(null);
  const headers = {
    token: localStorage.getItem('userToken')
  };

  const checkoutSchema = yup.object({
    shippingAddress: yup.object({
      details: yup.string().required("Details are required").min(3, "Details must be at least 3 characters"),
      phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number"),
      city: yup.string().required("City is required")
    })
  });

  function createCashOrder(values) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.data.data._id}`, values, { headers })
      .then(response => {
        console.log(response);
        if(response.data.status=="success"){
          toast.success("Cash order created successfully",{
            duration:1500,
            position:'top-center'
          })
        }
      })
      .catch(error => {
        console.error(error);
          toast.error("Failed to create cash order!",{
            duration:1500,
            position:'top-center'
          })
      });
  }

  function createOnlineOrder(values) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data.data._id}?url=https://omarbassuony.github.io/FreshCart/#`, values, { headers })
      .then(response => {
        console.log(response.data.status);
        if (response.data.status == "success") {
          toast.success("online order created successfully",{
            duration:1500,
            position:'top-center'
          })
          window.location.href = response.data.session.url;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: ""
      }
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      if (orderType == "cash"){
        createCashOrder(values);
        formik.resetForm();
      }
      else{
        createOnlineOrder(values);
        formik.resetForm();
      } 
    }
  });

  return (
    <div className="container flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-3 text-green-600">Shipping Address</h2>
      <form className="flex flex-col gap-4 w-full md:w-[800px]" onSubmit={formik.handleSubmit}>
        <input
          placeholder="City"
          className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
          type="text"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city ? (
          <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">{formik.errors.shippingAddress.city}</div>
        ) : null}
        
        <input
          placeholder="Phone"
          className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
          type="text"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone ? (
          <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">{formik.errors.shippingAddress.phone}</div>
        ) : null}

        <textarea
          placeholder="Details"
          className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-green-600 focus:drop-shadow-md"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details ? (
          <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">{formik.errors.shippingAddress.details}</div>
        ) : null}

        <div className="flex justify-center">
          <button
            onClick={() => {
              setOrderType("cash");
            }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-2 w-fit rounded-lg mx-3"
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setOrderType("online");
            }}
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 w-fit rounded-lg"
          >
            Online Payment
          </button>
        </div>
      </form>
    </div>
  );
}
