import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useRef } from "react";

const MainLayout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const main = mainRef.current;
    const footer = footerRef.current;

    if (header && main && footer) {
      const headerHeight = header.offsetHeight + 10 + "px";

      main.style.cssText = `
      padding-top: ${headerHeight};
      padding-bottom: 20px;
      --footer-height: ${footer.offsetHeight}px;
      `;
    }
  }, []);

  return (
    <>
      <Header ref={headerRef} />

      <main id="app-main-el" ref={mainRef}>
        {<Outlet />}
      </main>

      <Footer ref={footerRef} />
    </>
  );
};
export default MainLayout;
