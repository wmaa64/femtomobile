import React from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";

const Footer = () => {
    const { setShowCart, totalQuantities } = useStateContext();
    const router = useRouter();

  return (
    <>
        <div className="footer-container" >
                <button type="button" className="footer-button"   onClick={() => router.push('/cartpage')} >
                    View Cart  ({totalQuantities})
                </button>
        </div>
    </>
  );
};

export default Footer;
