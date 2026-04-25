import Header from "@/components/website/global/Header";
import Footer from "@/components/website/global/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}