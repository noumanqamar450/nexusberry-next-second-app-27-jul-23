'use client'
import React, { useState } from 'react'
import { useContext } from 'react'
import CartContext from '../contextApi/Cart/CartContext'

export default function Cart() {
    const [show, setShow] = useState(false);

    const { cart, setCart } = useContext(CartContext)

    let style = 'p-5 w-full md:w-[350px] h-screen bg-white/70 fixed z-50 top-0 backdrop-blur-lg shadow-2xl transition-all duration-1000'
    
    style = show ? style + ' right-0' : style + ' -right-full md:-right-1/2';

    const removeItem = (id) => {
        let filteredItem = cart.filter(p => p.id != id);
        setCart(filteredItem);
    }

    const plusItem = (id, limit) => {
        const copyCart = [...cart];
        let index = cart.findIndex(p => p.id == id)
        let pro = copyCart[index];
        
        if (pro.qty >= limit){
            pro.qty += 1;
            pro.total += (pro.price + pro.extraPrice)
            setCart(copyCart)
        } else {
            pro.qty += 1;
            pro.total += pro.price
            setCart(copyCart)
        }
    }

    const minusItem = (id, limit) => {
        const copyCart = [...cart];
        let index = cart.findIndex(p => p.id == id)
        let pro = copyCart[index];

        if (pro.qty > limit) {
            pro.qty -= 1;
            pro.total -= (pro.price + pro.extraPrice)
            setCart(copyCart)
        } else {
            pro.qty -= 1;
            pro.total -= pro.price
            setCart(copyCart)
        }
    }

    return (
        <>
            <div onClick={() => setShow(true)} className='fixed z-50 top-0 right-0 flex justify-center items-center p-3 bg-slate-600 text-white cursor-pointer'>
                ({cart.length})
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='w-6 h-6'>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </div>
            <div className={style}>
                <svg onClick={() => setShow(false)} className='absolute top-4 left-4 w-8 cursor-pointer hover:rotate-90 transition-all' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h2 className='text-lg font-semibold text-right mb-3'>Item: ({cart.length})</h2>
                <hr />
                <div className='w-full my-4 overflow-y-auto px-2 h-[80%]'>
                    {
                        cart.length > 0 && cart.map(c => (
                            <div key={c.id} className='relative border mb-4 p-3 border-slate-600 '>
                                <svg className='absolute top-0 right-0 w-5 cursor-pointer bg-black/75 text-white backdrop-blur-lg' onClick={() => removeItem(c.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <h2 className='font-medium'>{c.title}</h2>
                                <div className='flex justify-between'>
                                    <p className='text-sm font-semibold text-gray-500'>$ {c.price} or {c.limitPrice} x $ {c.extraPrice}</p>
                                    <p className='text-sm font-semibold text-gray-500'>QTY: {c.qty}</p>
                                </div>
                                <div  className='flex justify-between'>
                                    <h4 className='text-lg font-semibold'>Total: $ {c.total}</h4> 
                                    <div className='flex justify-between gap-2'>
                                        <svg onClick={() => plusItem(c.id, c.limitPrice)} className="w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <svg onClick={() => c.qty > 1 ? minusItem(c.id, c.limitPrice) : removeItem(c.id)} className="w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <hr className='my-3'/>
                <div className='text-xl font-bold flex justify-between'>
                    <h2>Grand Total:</h2>
                    <h2>$ {cart.length > 0 ? cart.reduce((plus, item) =>{ return item.total + plus }, 0) : 0}</h2>
                </div>
                <button className='w-full p-3 mt-3 text-white bg-slate-600 hover:bg-slate-700 transition-all'>Place Order</button>
            </div>
        </>
    )
}
