import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import  { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />
      <Hero/>
      <div >{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
