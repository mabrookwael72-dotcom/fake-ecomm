'use client'
import axios from "axios"
import { createContext, useState } from "react"

export let CartContext = createContext(null)

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0)

  function getHeaders() {
    return {
      token: typeof window !== "undefined" ? localStorage.getItem('userToken') : null
    }
  }

  async function getLoggedCart() {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: getHeaders()
    })
    setNumOfCartItems(res.data.numOfCartItems)
    return res
  }

  async function addProductCart(productId) {
    const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers: getHeaders() }
    )
    setNumOfCartItems(res.data.numOfCartItems)
    return res
  }

  async function UpdateCartProduct(productId, count) {
    const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers: getHeaders() }
    )
    setNumOfCartItems(res.data.numOfCartItems)
    return res
  }

  async function deletProductCart(productId) {
    const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: getHeaders()
    })
    setNumOfCartItems(res.data.numOfCartItems)
    return res
  }

  return (
    <CartContext.Provider value={{ numOfCartItems, setNumOfCartItems, deletProductCart, getLoggedCart, addProductCart, UpdateCartProduct }}>
      {props.children}
    </CartContext.Provider>
  )
}