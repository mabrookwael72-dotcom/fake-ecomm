'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Rejestr() {
  const router = useRouter();
let {setToken}=useContext(UserContext)
  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(30).required('الاسم مطلوب'),
    email: Yup.string().email().required('البريد مطلوب'),
    password: Yup.string().min(6).required('الباسورد مطلوب'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'غير متطابق').required('مطلوب'),
    
  });

  async function handleRegister(values) {
    try {
      // اللينك الصح لمشروع Linked Posts
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      console.log(data);
            localStorage.setItem('userToken',data.token)
      setToken(data.token)
      if(data.message==='success'){
      router.push('/home');}
      // لو نجح روح للوجن مش الهوم
      
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'حدث خطأ ما، اتأكد من النت');
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '', email: '', password: '', rePassword: '',
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900" dir="ltr ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl text-center font-bold text-gray-900 md:text-2xl dark:text-white">
                Create Account
              </h1>
              
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Your name</label>
                  <input type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Ahmed"/>
                  {formik.errors.name && formik.touched.name && <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Your email</label>
                  <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com"/>
                  {formik.errors.email && formik.touched.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Password</label>
                  <input type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="••••••••" className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"/>
                  {formik.errors.password && formik.touched.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Confirm password</label>
                  <input type="password" name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} placeholder="••••••••" className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"/>
                  {formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-500 text-xs mt-1">{formik.errors.rePassword}</p>}
                </div>
             <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!(formik.isValid && formik.dirty) ? 'bg-gray-800 hover:bg-blue-700 cursor-pointer'  : 'bg-gray-800 hover:bg-blue-700'}`}>
                  Create an account
                </button>
                
                <p className="text-sm font-light text-gray-500">
                  Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}