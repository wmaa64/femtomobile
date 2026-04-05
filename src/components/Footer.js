import React from "react";
import { useStateContext } from "../../context/StateContext";

const Footer = () => {
    const { setShowCart, totalQuantities } = useStateContext();

  return (
    <>
        <div className="footer-container" >
                <button type="button" className="footer-button"   onClick={() => setShowCart(true)} >
                    View Cart  ({totalQuantities})
                </button>
        </div>
    </>
  );
};

export default Footer;
