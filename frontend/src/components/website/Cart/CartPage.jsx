'use client'
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { qtyChange } from "@/redux/features/cartSlice";

const CartPage = () => {
  const cart = useSelector((store) => store.cart)
  const dispatch = useDispatch()
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: CART ITEMS */}
        <div className="lg:col-span-2 space-y-5">

          {/* ITEM */}
          {
            cart.items.map((item, index) => {
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-5 flex gap-5 items-center">
                  <div className="relative">
                    <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
                      SAVE $199
                    </span>
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-28 h-28 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-red-500 text-lg font-bold mt-1">${item.original_price}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button onClick={() => dispatch(qtyChange({ id: item.id, flag: 'dec' }))} className="px-3 py-1 text-gray-500">-</button>
                        <span className="px-4">{item.qty}</span>
                        <button className="px-3 py-1 text-gray-500" onClick={() => dispatch(qtyChange({ id: item.id, flag: 'inc' }))}>+</button>
                      </div>
                      <span className="text-green-600 text-sm">Free Shipping</span>
                    </div>

                    <p className="text-sm text-green-600 mt-1">{item.stock ? "● In stock" : "Out of Stock"}</p>
                  </div>
                </div>
              )
            })
          }


        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit border border-green-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Sub Total</span>
              <span className="font-medium">${cart.original_total}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Saving</span>
              <span className="font-medium">${(cart.original_total - cart.final_total)}</span>
            </div>



            <div className="border-t pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${cart.final_total}</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;