"use client"; // ToastContainer browser events use karta hai, isliye client component zaroori hai

import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * (user-auth) Group Layout
 * Yeh layout sirf Login, Register, aur OTP pages par apply hoga.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-center">
      {/* ToastContainer: Yeh notifications dikhane ke liye hai */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Auth Pages Content (Login/Register/OTP) */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}