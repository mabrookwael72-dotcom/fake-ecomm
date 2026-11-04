'use client'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { CartContext } from "../../../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id } = useParams();
  let {addProductCart}=useContext(CartContext)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  async function addCart(productId) {
   
    let respons=await addProductCart(productId)
 if(respons.data.status==='success'){
 toast('Product added successfully to your cart')
}
}
  async function getProduct(productId) {
    try {
      let { data } = await axios.get( `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  if (loading) return <h1 className="text-center mt-20 dark:text-white">Loading...</h1>;
  if (!product) return <h1 className="text-center mt-20">Product not found</h1>;

  return (
    <div className="p-4  max-w-6xl mx-auto dark:bg-slate-900 transition-colors">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* الصورة لازقة في البوردر زي ما طلبت */}
        <div className="w-full md:w-1/3 border rounded-lg overflow-hidden">
          <img 
            className="w-full object-cover" 
            src={product.imageCover} 
            alt={product.title} 
          />
        </div>

        <div className="pt-10 md:pt-10 w-full md:w-2/3 dark:text-white">
          <h2 className="text-2xl font-bold pb-2">{product.title}</h2>
          <h3 className="font-light text-slate-600 dark:text-slate-300 pb-5">
            {product.description}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 pb-4">
            {product.category?.name}
          </p>

          <div className="pt-30 w-full flex justify-between items-center">
            <p className="font-bold text-lg">{product.price} EGP</p>
            <p className="flex items-center gap-1">⭐ {product.ratingsAverage}</p>
          </div>

          <button onClick={()=>addCart(product.id)} className="cursor-pointer w-full mt-6 bg-slate-900 dark:bg-blue-600 text-white p-3 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition">
            add to cart
          </button>
        </div>

      </div>
    </div>
  );
}