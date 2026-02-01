import type React from "react";
import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/Header/Header";

type MainLayoutProps = {
  contentClassName?: string,
  children?: React.JSX.Element
}

const MainLayout = ({ contentClassName, children }: MainLayoutProps) => {
  return (<>
    <Header />
    <main className={ `${contentClassName ? contentClassName : ""} sm:relative sm:-top-10` }>
      { children }
    </main>
    <Footer />
  </>);
}

export default MainLayout;