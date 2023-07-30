'use client'
import Image from "next/image";
import { useContext } from "react";
import CartContext from '../contextApi/Cart/CartContext'

export const ProCard = ({pro}) => {

    const {cart, setCart } = useContext(CartContext)

    function addToCart() {

        let copyCart = [...cart];

        const findIndex = copyCart.findIndex(p => p.id === pro.id)
        
        if (findIndex === -1) {
            pro.qty = 1;
            pro.total = pro.price;
            setCart([...cart, pro])
        } else {
            const product = copyCart[findIndex];
            if(pro.limitPrice <= product.qty) {
                product.qty += 1;
                product.total += product.price + product.extraPrice;
                setCart(copyCart)
            } else {
                product.qty += 1;
                product.total += product.price;
                setCart(copyCart)
            }
        }   

    }

    return (
        <div className="group w-full cursor-pointer">
            <div className="overflow-hidden relative">
                <Image
                    src={pro.image}
                    alt={pro.title}
                    width={600}
                    height={1000}
                    className="group-hover:scale-105 group-hover:rotate-2 transition-all"
                />
                {
                    pro.freeShipping && (
                        <div className="px-3 py-1 text-xs bg-black text-white absolute z-30 top-0 right-0">Free Shipping</div>
                    )
                }
                <div className="absolute z-30 top-2 left-2">
                    {
                        pro.attribute.size.map(s=> <div key={s} className=" bg-cyan-600 uppercase text-white mb-1 w-6 h-6 text-xs flex justify-center items-center text-center rounded-full">{s}</div>)
                    }
                </div>
                <div className="w-full min-h-4 backdrop-blur-lg bg-slate-600/50 absolute z-30 bottom-[-55%] transition-all duration-500 group-hover:bottom-0 p-2 text-white text-center">
                    <h1 className="truncate text-sm">{pro.title}</h1>
                    <h4 className="font-semibold text-lg">$ {pro.price}</h4>
                    <p className="text-slate-50 opacity-70">or {pro.limitPrice} x $ {pro.extraPrice}</p>
                    <button className="px-4 py-2 mt-1 bg-cyan-500 hover:bg-sky-600 transition-all" onClick={addToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}
