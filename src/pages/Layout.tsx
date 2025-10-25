import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
