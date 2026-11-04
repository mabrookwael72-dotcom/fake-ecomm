'use client'
import { useFormik } from 'formik';
import axios from 'axios';

import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Login() {
  let {userToken,setToken}=useContext(UserContext)
let router=useRouter()
  // دالة الإرسال لطلب تسجيل الدخول (Signin)
  async function handleLogin(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      console.log('تم تسجيل الدخول بنجاح:', data);
      toast('success')
      localStorage.setItem('userToken',data.token)
      setToken(data.token)
      if(data.message==='success'){
         

      router.push('/home');}
      // يمكنك هنا حفظ الـ token في localStorage والتوجيه للرئيسية
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  }

  let Formik = useFormik({
    initialValues: {
      email: '', 
      password: ''
    },
    onSubmit: handleLogin
  });

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900" dir="ltr">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         <div className="flex-shrink-0">
            <Link href="/login" className="text-4xl pb-5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-indigo-500">
              Store
            </Link>
          </div>

          <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in 
              </h1>
              
              <form onSubmit={Formik.handleSubmit} className="space-y-4 md:space-y-6">
                
                {/* البريد الإلكتروني */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input 
                    type="email"
                    name="email"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.email} 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="name@company.com" 
                    required
                  />
                  {Formik.errors.email && Formik.touched.email && (
                    <p className="text-red-500 text-xs mt-1">{Formik.errors.email}</p>
                  )}
                </div>

                {/* كلمة المرور */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.password} 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    required
                  />
                  {Formik.errors.password && Formik.touched.password && (
                    <p className="text-red-500 text-xs mt-1">{Formik.errors.password}</p>
                  )}
                </div>

                {/* زر تسجيل الدخول */}
                <button 
                  type="submit" 
                  className="w-full text-white bg-gray-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Sign in
                </button>
                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link href="/rejestr" className="font-medium text-primary-600 text-blue-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}