'use client'
import { useFormik } from 'formik';
import axios from 'axios';

import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ChekOut() {
  function getHeaders() {
    return {
      token: localStorage.getItem('userToken') 
    }
  // دالة الإرسال لطلب تسجيل الدخول (Signin)
  }
  let Formik = useFormik({
    initialValues: {
      details: '', 
      phone: '',
      city: ''
    },
    onSubmit: handleChekout
  });
  async function handleChekout() {
  try {
    // 1. هات الكارت بتاع اليوزر الأول عشان تجيب الـ ID الصح
    let { data: cartData } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: getHeaders() }
    );

    let cartId = cartData.data._id;

    if (!cartId) {
      toast.error('الكارت فاضي');
      return;
    }

    // 2. ابعت طلب الـ checkout-session بالـ ID الصح
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
      { shippingAddress: Formik.values },
      { headers: getHeaders() }
    );

    // 3. وديه لصفحة الدفع
    window.location.href = data.session.url;

  } catch (err) {
    console.log(err.response?.data); // ده هيوريك رسالة السيرفر الحقيقية
    toast.error(err.response?.data?.message || 'حصل مشكلة');
  }
} 



  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900" dir="ltr">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         <div className="flex-shrink-0">
           
          </div>

          <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              
              <form onSubmit={Formik.handleSubmit} className="space-y-4 md:space-y-6">
                
                {/* البريد الإلكتروني */}
                <div>
                  <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                  <input 
                    type="text"
                    name="details"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.details} 
                    id="details" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="Details" 
                    required
                  />
                  {Formik.errors.details && Formik.touched.details && (
                    <p className="text-red-500 text-xs mt-1">{Formik.errors.details}</p>
                  )}
                </div>

                {/* كلمة المرور */}
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.phone} 
                    id="phone" 
                    placeholder="01159998598" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    required
                  />
                  {Formik.errors.phone && Formik.touched.phone && (
                    <p className="text-red-500 text-xs mt-1">{Formik.errors.phone}</p>
                  )}
                </div>

 <div>
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
                  <input 
                    type="text" 
                    name="city"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.city} 
                    id="city" 
                    placeholder="city" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    required
                  />
                  {Formik.errors.city && Formik.touched.city && (
                    <p className="text-red-500 text-xs mt-1">{Formik.errors.city}</p>
                  )}
                </div>
                {/* زر تسجيل الدخول */}
                <button 
                  type="submit" 
                  className="cursor-pointer w-full text-white bg-gray-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Pay Now
                </button>
                
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}