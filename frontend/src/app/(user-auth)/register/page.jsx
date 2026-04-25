'use client'
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axiosinstance, notify } from "@/helper/helper";

export default function Register() {
  
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      notify("Passwords do not match", false);
      return;
    }

    setloading(true);

    axiosinstance
      .post("/user/create", form)
      .then((res) => {
        
        if (res.data.success) {
          notify(res?.data?.message, true);
          setForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
          router.push(`/verify-otp?email=${res.data.email}`);
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-50 p-6">
          <img
            src="/register-illustration.png"
            alt="register"
            className="max-w-full h-auto"
          />
        </div>

        {/* FORM */}
        <div className="w-full md:w-1/2 p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-teal-600 text-center">
            Register
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            JOIN TO US
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            ALREADY USER ?{" "}
            <Link href="/login" className="text-teal-500 hover:underline">
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}