'use client'
import React, { useEffect, useState } from 'react'
import { ProCard } from "./ProCard";

const Shop = () => {
    const [products, setProducts] = useState(null)
    const [allProducts, setAllProducts] = useState(null)

    const apiHandle = async () => {
        let res = await fetch(`${process.env.NEXT_APP_SITE_URL || 'http://localhost:3000'}/api/product`,{
            cache:"no-store"
        })
        res = await res.json();
        setProducts(res);
        setAllProducts(res);
    } 
    
    useEffect(()=>{
        apiHandle();
    }, [])

    const filter = (str) => {
        if (str !== 'all') {
            const pro = allProducts?.filter(p => p.attribute.size.includes(str))
            setProducts(pro)
        } else {
            setProducts(allProducts)
        }
    }

    const filterButton = (e) => {
        
        const filterBtn = document.getElementsByClassName('filter-btn')
        for (let i = 0; i < filterBtn.length; i++ ) {
            filterBtn[i].classList.remove("bg-slate-600");
            filterBtn[i].classList.remove("text-white");
        }
        
        if(e !== 'all') {
            e.target.classList.add("bg-slate-600")
            e.target.classList.add("text-white")
        }
    }

    return (
        <div className="flex flex-wrap md:flex-nowrap">
            <div className='w-full md:w-[20%] lg:w-[30%] p-5'>
                <div className='sticky top-4'>
                    <h2 className='text-3xl font-semibold mb-4'>Filter</h2>
                    <hr />
                    <h3 className='ml-4 mt-3 text-lg'>Size</h3>
                    <div className='flex flex-wrap gap-4 p-4 font-medium'>
                        <button className='filter-btn w-10 h-10 rounded-full border border-cyan-600 uppercase text-base' onClick={(e)=> { 
                            filter('sm')
                            filterButton(e)
                            }}>sm</button>
                        <button className='filter-btn w-10 h-10 rounded-full border border-cyan-600 uppercase text-base' onClick={(e) => {
                            filter('md')
                            filterButton(e)
                        }}>md</button>
                        <button className='filter-btn w-10 h-10 rounded-full border border-cyan-600 uppercase text-base' onClick={(e) => {
                            filter('lg')
                            filterButton(e)
                        }}>lg</button>
                        <button className='filter-btn w-10 h-10 rounded-full border border-cyan-600 uppercase text-base' onClick={(e) => {
                            filter('xl')
                            filterButton(e)
                        }}>xl</button>
                    </div>
                    <button className='underline ml-4 text-base' onClick={() => {
                        filter('all')
                        filterButton('all')
                    }}>Reset</button>
                </div>
            </div>
            <div className='w-full md:w-[80%] lg:w-[70%] p-5'>
                <h3 className='text-xl font-semibold mb-6'>({products ? products?.length : 0}) product found.</h3>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        !products ? [1,2,3,4,5,6,7,8].map(loading => (
                            <div key={loading} className='w-full min-h-[350px] bg-slate-200 animate-pulse'></div>
                        )) :
                        products?.map((p) => (
                            <ProCard key={p.id} pro={p} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Shop;
