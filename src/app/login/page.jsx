'use client'
import { useFormik } from 'formik';
import axios from 'axios';

import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function Login() {
  const {setToken}=useContext(UserContext)
const router=useRouter()
  async function handleLogin(values) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      
      setToken(data.token)
      if(data.message==='success'){
        toast('تم تسجيل الدخول')
               localStorage.setItem('userToken',data.token)


      router.push('/home');}
   } catch (error) {
  
   toast('البريد الالكتروني أو كلمة المرور غير صحيحة') 
 
}
  }

  const formik = useFormik({
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
              
              <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input 
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email} 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="name@company.com" 
                    required
                  />
                  
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password} 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    required
                  />
                 
                </div>

                <button 
                  type="submit" 
                  className="cursor-pointer w-full text-white bg-gray-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Sign in
                </button>
                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link href="/register" className=" font-medium text-primary-600 text-blue-600 hover:underline cursor-pointer dark:text-primary-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}