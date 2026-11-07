'use client'

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";

export default function RecantHome() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const { addProductCart } = useContext(CartContext)

  // الحماية: لو مش مسجل دخول، ارجع للوجن
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      router.push('/login')
    } else {
      setIsChecking(false)
    }
  }, [router])

  async function addProduct(productId) {
    try {
      const res = await addProductCart(productId)
      if (res.data.status === 'success') {
        toast('تم الاضافة بنجاح')
      }
    } catch (error) {
      console.log(error)
      toast('Please login first')
    }
  }

  async function getProduct() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  const {  data } = useQuery({
    queryKey: ['repoData'],
    queryFn: getProduct
  })

  // طول ما بنتأكد من التوكن، متعرضش حاجة
  if (isChecking) return <h1 className="text-center mt-20">Loading...</h1>

  return (
    <div className="grid grid-cols-2 bg-gray-200 md:grid-cols-4 gap-4 p-4">
      {data?.data.data.map((product) => (

        <div key={product._id} className="border shadow-2xl rounded-3xl">
          <Link href={`/home/productDetails/${product._id}`}>
            <img className="w-full rounded-3xl h-[250px]" src={product.imageCover} alt={product.title} />
            <div className="text-green-600 px-3 font-light">{product.category.name}</div>
            <h2 className="px-3">{product.title.split(" ").slice(0, 2).join(" ")}</h2>
            <div className="pt-4 w-full px-3 flex justify-between">
              <p>{product.price} EGP</p>
              <p>{product.ratingsAverage}</p>
            </div>
          </Link>
          <button onClick={() => addProduct(product._id)} className="rounded-2xl w-full cursor-pointer bg-gray-800 hover:bg-black text-white p-2 mt-2">add to cart</button>
        </div>
      ))}
    </div>
  )
}