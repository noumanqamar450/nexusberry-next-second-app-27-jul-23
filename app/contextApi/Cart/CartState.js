'use client'
import React, { useState } from 'react'
import CartContext from './CartContext'

export default function CartState({ children }) {
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}
