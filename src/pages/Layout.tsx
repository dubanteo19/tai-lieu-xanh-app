import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="grow bg-amber-50 px-4 md:px-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
