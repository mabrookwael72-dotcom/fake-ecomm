'use client'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { userToken, setToken } = useContext(UserContext)
  const { numOfCartItems, getLoggedCart, setNumOfCartItems } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false);

  // اول ما تسجل دخول، هات عدد المنتجات اللي في الكارت
  useEffect(() => {
    if (userToken) {
      getLoggedCart().catch(() => {})
    } else {
      setNumOfCartItems(0)
    }
  }, [userToken])

  function handleLogout() {
    localStorage.removeItem('userToken')
    setToken(null)
    setNumOfCartItems(0)
    router.push('/login')
  }

  // دي بديل getNavLinkClass بتاعت React Router
  function getNavLinkClass(path: string) {
    const isActive = pathname === path
    return `text-sm font-medium transition px-3 py-2 rounded-lg ${
      isActive
        ? 'text-blue-400 bg-blue-600/10 font-semibold'
        : 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50'
    }`;
  }

  function getMobileNavLinkClass(path: string) {
    const isActive = pathname === path
    return `block px-3 py-2 rounded-lg text-base font-medium transition ${
      isActive
        ? 'text-blue-400 bg-blue-600/10 font-semibold'
        : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }`;
  }

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
              Store
            </Link>
          </div>

          {userToken !== null ? (
            <>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/home" className={getNavLinkClass('/home')}>Home</Link>
                
                {/* سلة الكارت - كمبيوتر */}
                <Link href="/cart" className={`${getNavLinkClass('/cart')} relative`}>
                  🛒 Cart
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {numOfCartItems}
                    </span>
                  )}
                </Link>
              </div>
              <div className="hidden md:flex items-center">
                <button onClick={handleLogout} className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-black rounded-lg">Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/login" className={getNavLinkClass('/')}>Login</Link>
                <Link href="/rejestr" className={getNavLinkClass('/rejestr')}>Register</Link>
              </div>
            </>
          )}

          <div className="md:hidden flex items-center gap-2">
            {/* سلة الكارت - موبايل جنب زرار الهامبرجر */}
            {userToken !== null && (
              <Link href="/cart" className="relative text-white text-xl px-2">
                🛒
                {numOfCartItems > 0 && (
                  <span className="absolute -top-1 -right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {numOfCartItems}
                  </span>
                )}
              </Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white p-2">
              ☰
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
         {userToken !== null ? (<>
          <Link href="/home" onClick={() => setIsOpen(false)} className={getMobileNavLinkClass('/home')}>Home</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)} className={getMobileNavLinkClass('/cart')}>
            Cart {numOfCartItems > 0 && `(${numOfCartItems})`}
          </Link>
          
           
               <button onClick={() => {handleLogout(); setIsOpen(false)}} className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-black hover:bg-red-700 rounded-lg">Logout</button>
            </>) : (<>
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg">Login</Link>
                <Link href="/rejestr" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">Register</Link>
              </>
           </> )}
          </div>
        
      )}
    </nav>
  );
}