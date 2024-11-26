import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React from "react";

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head title="Product" />
      <div className="bg-cyan-800">
      <main>{children}</main>
      <Footer/>
      </div>
    </>
  );
};

export default DetailLayout;
