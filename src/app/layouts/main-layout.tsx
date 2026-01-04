import { Footer } from "@/shared/components/Footer";
import Header from "@/shared/components/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className=" flex flex-1 overflow-y-auto bg-amber-50 px-4 md:px-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
