import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({ children }) {
  return (
    <div className="w-full h-screen flex">
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}