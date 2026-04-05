import React from 'react';
import { useRouter  } from "next/router";
import { AiOutlineShopping, FiShoppingCart } from "react-icons/fi";
import { useStateContext } from "../../context/StateContext";
import Cart from "../components/Cart";

const Header = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const router = useRouter();

  return (
    <>
      <header className="header">
        <h2 className="header-title">Catalog</h2>

        <button
          type="button"
          className="cart-icon"
          onClick={() =>router.push('/cartpage')}
        >
          <FiShoppingCart />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </header>

      {showCart && <Cart />}
    </>
  );
};

export default Header;