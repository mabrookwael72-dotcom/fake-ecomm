'use client'

import Navbar from "./_components/navbare"
import "./globals.css"
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'

import UserContextProvider from "@/context/UserContext"
import { Toaster } from "react-hot-toast"
import CartContextProvider from "@/context/CartContext"
const queryClient = new QueryClient()


export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
         <CartContextProvider>
        <UserContextProvider>
         
          <Navbar/>
          <Toaster/>
          {children}
        </UserContextProvider>
                  </CartContextProvider>

                  </QueryClientProvider>

      </body>
    </html>
  )
}