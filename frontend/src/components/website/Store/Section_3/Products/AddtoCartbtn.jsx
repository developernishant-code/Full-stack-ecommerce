'use client'
import { addtocart, qtyChange } from '@/redux/features/cartSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AddtoCartbtn({ product }) {
  const cart = useSelector((store) => store.cart)
  const cartitem = cart.items.find((item) => item.id === product._id)
  const dispatch = useDispatch()

  return (
    <div className="w-full flex justify-center items-center my-3">
      {
        cartitem ? (
          <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-xl shadow">
            
            {/* Decrease Button */}
            <button
              onClick={() => dispatch(qtyChange({ id: product._id, flag: 'inc' }))}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              +
            </button>

            {/* Quantity */}
            <span className="text-lg font-semibold">
              {cartitem.qty}
            </span>

            {/* Increase Button */}
            <button
              onClick={() => dispatch(qtyChange({ id: product._id, flag: 'dsc' }))}
              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
            >
              -
            </button>

          </div>
        ) : (
          <button
            onClick={() => {
              dispatch(
                addtocart({
                  name: product.name,
                  original_price: product.original_price,
                  final_price: product.final_price,
                  id: product._id,
                  discount_price: product.discount_price,
                  thumbnail:
                    process.env.NEXT_PUBLIC_PRODUCT_IMAGE + product.thumbnail,
                  stock: product.stock,
                  qty: 1
                })
              )
            }}
            disabled={!product.stock}
            className={`w-full py-2 rounded-xl font-semibold transition 
              ${product.stock 
                ? 'bg-teal-500 text-white hover:bg-teal-600 cursor-pointer' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
            `}
          >
            {product.stock ? "Add to Cart" : "Out of Stock"}
          </button>
        )
      }
    </div>
  )
}