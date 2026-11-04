'use client'
import { createContext, useState, useEffect } from "react"

export let UserContext = createContext()

export default function UserContextProvider({children}) {
  const [userToken, setToken] = useState(null)

  // ده السطر اللي ناقص عندك
  useEffect(() => {
    if(localStorage.getItem('userToken')){
      setToken(localStorage.getItem('userToken'))
    }
  }, [])

  return <UserContext.Provider value={{userToken, setToken}}>
    {children}
  </UserContext.Provider>
}