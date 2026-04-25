'use client'
import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { axiosinstance, notify } from '@/helper/helper';

const LoginPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      notify("Please fill all fields", false);
      return;
    }

    setloading(true);

    axiosinstance
      .post("/user/login", form) // ✅ correct API
      .then((res) => {
        if (res.data.success) {
          notify(res?.data?.message, true);
          setForm({ email: "", password: "" });

          router.push("/"); // ya dashboard
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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="w-full md:w-1/2 hidden md:flex justify-center">
          <img src="/login.png" className="max-w-md" />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <h1 className="text-3xl font-bold text-teal-600 mb-2">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-6 text-sm">
            New user?{" "}
            <Link href="/register" className="text-teal-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;