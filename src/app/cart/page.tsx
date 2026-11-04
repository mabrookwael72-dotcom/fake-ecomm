'use client'
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CartContext } from "../../context/CartContext"

export default function Cart() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  let { getLoggedCart, UpdateCartProduct, deletProductCart } = useContext(CartContext)

  async function deletCart(productId) {
    let respons = await deletProductCart(productId)
    setLogged(respons.data.data)
  }

  async function updatCart(productId, count) {
    // لو العدد بقى 0 امسح المنتج على طول
    if (count === 0) {
      deletCart(productId)
      return
    }
    let respons = await UpdateCartProduct(productId, count)
    setLogged(respons.data.data)
  }

  const [UserLogged, setLogged] = useState(null)
  async function getItem() {
    try {
      let respons = await getLoggedCart()
      setLogged(respons.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      router.push('/login')
    } else {
      setIsChecking(false)
      getItem()
    }
  }, [router])

  if (isChecking) return <h1 className="text-center mt-20">Loading...</h1>

  // لو الكارت فاضي
  if (!UserLogged || UserLogged.products.length === 0) {
    return <h1 className="text-center mt-20 text-xl">Your cart is empty 🛒</h1>
  }

  return (
    <>
      <div className="bg-gray-200 relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">

        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Product
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {UserLogged?.products.map((product) =>
              <tr key={product.product.id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={product.product.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-heading">
                  {product.product.title}        </td>
                <td className="px-6 py-4">
                  <form className="max-w-xs mx-auto">
                    <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
                    <div className="relative flex items-center gap-2">
                      <button onClick={() => updatCart(product.product.id, product.count - 1)} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-1 rounded-full text-sm focus:outline-none h-6 w-6">
                        <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
                      </button>
                      <span>{product.count}</span>
                      <button onClick={() => updatCart(product.product.id, product.count + 1)} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-1 rounded-full text-sm focus:outline-none h-6 w-6">
                        <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
                      </button>
                    </div>
                  </form>
                </td>
                <td className="px-6 py-4 font-semibold text-heading">
                  <span> {product.price * product.count} EGP  </span>     </td>
                <td className="px-6 py-4">
                  <span onClick={() => deletCart(product.product.id)} className="cursor-pointer hover:text-red-700 font-medium text-fg-danger hover:underline">Remove</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <h3 className="p-3"> total Price : {UserLogged?.totalCartPrice}</h3>
      </div>
    </>
  )
}