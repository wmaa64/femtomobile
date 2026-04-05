import React, { useState, useEffect } from "react";
import Link from "next/link";
import {AiOutlineShopping} from "react-icons/ai";
import { Cart } from "./";
import Styles from "../styles/navbar.module.css";
import { useStateContext } from "../../context/StateContext";
import { blue } from "@mui/material/colors";

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities, userInfo, logoutUser } = useStateContext();
  const [open, setOpen] = useState(false);
  
return (
<div className="navbar-container">
    <div className="company-name">
        <Link href="/"><h6 style={{color: "blue" }}>Pet Suppliers</h6></Link>
        <div className="navbar" logo="true">
            <nav className={Styles.navbar}>
                <div className={Styles.navItem} logo="true">
                    {userInfo?.isAdmin ? (
                        <>
                            <Link href="/products/manage">Manage Products</Link>
                            <Link href="/orders/manage">Manage Orders</Link>
                        </> ) : (
                        <>
                            <Link href="/">Home</Link>
                            <Link href="/pet-suppliers">Pet Suppliers Shop</Link>
                            <Link href="/about">About Us</Link>

                            {/* Dropdown menu for categories 
                            <button className={Styles.navButton} onClick={() => setOpen(!open)}>
                                Laboratory equipment ▼
                            </button>
                            {open && (
                                <div className={Styles.dropdown}>
                                    <Link href="/shop" className={Styles.dropdownLink} onClick={()=> setOpen(false)}>
                                        Chemistry equipment
                                    </Link>
                                    <Link href="/shop" className={Styles.dropdownLink} onClick={()=> setOpen(false)}>
                                        CBC equipment
                                    </Link>
                                    <Link href="/shop" className={Styles.dropdownLink} onClick={()=> setOpen(false)}>
                                        Liquidity equipment
                                    </Link>
                                    <Link href="/shop" className={Styles.dropdownLink} onClick={()=> setOpen(false)}>
                                        Microscopes
                                    </Link>
                                </div>)
                            }
                            <button className={Styles.navButton} onClick={() => setOpen(!open)}>
                                Materials ▼
                            </button>
                            */}
                        </>
                    )}

                    {userInfo ? (
                        <button onClick={logoutUser} style={{ color: "red" , border: "none", background: "transparent", cursor: "pointer" }}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/users/login">
                                <button style={{ color: "red", border: "none", background: "transparent", cursor: "pointer" }}>
                                    Login
                                </button>
                            </Link>
                            <Link href="/users/register">
                                <button style={{color: "red", border: "none", background: "transparent", cursor: "pointer" }}>
                                    Register
                                </button>

                            </Link>
                        </>
                    )}
                    
                    <button  type="button"   className="cart-icon"  onClick={() => setShowCart(true)}>
                        <AiOutlineShopping />
                        <span className="cart-item-qty">{totalQuantities}</span>
                    </button>
                    {showCart && <Cart />}
                </div>
            </nav>
        </div>
    </div>
</div>
);
}

export default NavBar;
