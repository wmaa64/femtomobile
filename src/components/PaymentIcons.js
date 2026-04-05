import React from "react";
import Image from "next/image";

const PaymentIcons = () => {
  return (
    <div className="payment-icons">
      <span className="visually-hidden">Payment methods</span>
      <ul className="payment-icons list--inline site-footer__icon-list">
        <li className="payment-icon ">
          <span style={{ color: "#caa34d" }} >Instapay: </span>
          <Image
            src="/images/instapay.jpg"   // put the logo in public folder
            alt="Instapay"
            width={24}
            height={24}
          />
          <span style={{ color: "#caa34d" }} > +2 01005126629</span>
        </li>
        <li className="payment-icon">
          <span style={{ color: "#caa34d" }} >Vodafone Cash: </span>
          <Image
            src="/images/VodafoneCash.jpg"   // put the logo in public folder
            alt="Instapay"
            width={40}
            height={40}
          />
          <span style={{ color: "#caa34d" }} > +2 01005126629</span>

        </li>
      </ul>
    </div>
  );
};

export default PaymentIcons;