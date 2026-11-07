'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function Allorders() {
  const [UserLogged, setLogged] = useState([])

  async function getallorders() {
    let token = localStorage.getItem('userToken')

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders`,
      { headers: { token } }
    )
    setLogged(data.data)
  }

  useEffect(() => {
    getallorders()
  }, [])

  return (
    <>
      <table className="text-gray-400 w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
          <tr>
            <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
            <th scope="col" className="px-6 py-3 font-medium">Product</th>
            <th scope="col" className="px-6 py-3 font-medium">Qty</th>
            <th scope="col" className="px-6 py-3 font-medium">Total Order</th>
          </tr>
        </thead>
        <tbody>
          {UserLogged?.map((order) =>
            order.cartItems?.map((item) => (
              <tr key={item._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                <td className="p-4">
                  <img src={item.product?.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={item.product?.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-heading">
                  {item.product?.title}
                </td>
                <td className="px-6 py-4">
                  {item.count}
                </td>
                
                <td className="px-6 py-4 font-semibold text-heading">
                  {order.totalOrderPrice} EGP
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  )
}