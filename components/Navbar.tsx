'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CircleUserRound, Menu, Search, ShoppingCart } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'
import { useState } from 'react'
import useCart from '@/lib/hooks/useCart'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useUser()
    const cart = useCart()
    const [dropdownMenu, setDropdownMenu] = useState(false)
    const [query, setQuery] = useState('')

    return (
        <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
            <Link href="/">
                <div
                    className="relative 
                   w-[120px] h-[40px] 
                   sm:w-[140px] sm:h-[45px] 
                   md:w-[160px] md:h-[50px] 
                   lg:w-[180px] lg:h-[55px]"
                >
                    <Image
                        src="/logo.png"
                        alt="logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Link>

            <div className="flex text-large-bold max-lg:hidden gap-8">
                <Link
                    href="/"
                    className={`hover:text-blue-1 ${pathname === '/' && 'text-blue-1'}`}
                >
                    Home
                </Link>
                <Link
                    href={user ? '/wishlist' : '/sign-in'}
                    className={`hover:text-blue-1 ${pathname === '/wishlist' && 'text-blue-1'}`}
                >
                    Wishlist
                </Link>
                <Link
                    href={user ? '/orders' : '/sign-in'}
                    className={`hover:text-blue-1 ${pathname === '/orders' && 'text-blue-1'}`}
                >
                    Orders
                </Link>
            </div>

            <div className="relative flex gap-3 items-center">
                <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
                    <input
                        className="outline-none max-sm:max-w-[120px]"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        disabled={query === ''}
                        onClick={() => router.push(`/search/${query}`)}
                    >
                        <Search className="cursor-pointer h-4 w-4 hover:text-blue-1" />
                    </button>
                </div>
                <Link
                    href="/cart"
                    className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
                >
                    <ShoppingCart />
                    <p className="text-base-bold">
                        Cart ({cart.cartItems.length})
                    </p>
                </Link>

                <Menu
                    className="cursor-pointer lg:hidden"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />

                {dropdownMenu && (
                    <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
                        <Link href="/" className="hover:text-blue-1">
                            Home
                        </Link>
                        <Link
                            href={user ? '/wishlist' : '/sign-in'}
                            className="hover:text-blue-1"
                        >
                            Wishlist
                        </Link>
                        <Link
                            href={user ? '/orders' : '/sign-in'}
                            className="hover:text-blue-1"
                        >
                            Orders
                        </Link>
                        <Link
                            href="/cart"
                            className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
                        >
                            <ShoppingCart />
                            <p className="text-base-bold">
                                Cart ({cart.cartItems.length})
                            </p>
                        </Link>
                    </div>
                )}

                {user ? (
                    <UserButton />
                ) : (
                    <Link href="/sign-in">
                        <CircleUserRound />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
