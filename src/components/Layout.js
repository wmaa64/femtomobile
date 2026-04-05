import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useStateContext } from "../../context/StateContext";

const Layout = ({ children }) => {
    const { totalQuantities } = useStateContext();

return (
<>
    <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </Head>

    <div className="app-container">
        <Header />
        <main>
            {children}
        </main>
        {totalQuantities > 0 && <Footer />}
    </div>
</>
);
};

export default Layout;