'use client'
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { axiosinstance,notify } from '@/helper/helper';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const OTPVerification = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalOtp = otp.join("")
    axiosinstance
      .post("/user/verify-otp", {otp:finalOtp,email})
      .then((res) => {
        // console.log(res)
        if (res.data.success) {
          notify(res?.data?.message, true);
          router.push("/login");
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";

        notify(message, false);
      })
      .finally(() => {
        setloading(false);
      });
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left Side: Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          {/* Using a placeholder - you can use your existing auth illustration here */}
          <img
            src="/api/placeholder/500/400"
            alt="Verification Illustration"
            className="w-full h-auto max-w-md object-contain"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-teal-600 mb-2">Verify OTP</h1>
            <p className="text-gray-400 text-sm tracking-widest font-medium uppercase">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Input Group */}
            <div className="flex justify-between gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                />
              ))}
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                Didn't receive the code?
                <button type="button" className="text-teal-600 font-semibold ml-1 hover:underline">
                  Resend OTP
                </button>
              </p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full md:w-48 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-teal-100"
            >
              {loading ? "Loggging in...." : "Verify"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center md:text-left">
            <p className="text-sm text-gray-400 font-medium">
              ALREADY VERIFIED? <Link href="/login" className="text-green-500 hover:text-green-600 font-bold ml-1">LOGIN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;