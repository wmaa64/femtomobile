import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {AiOutlineLeft} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../../context/StateContext";

import { eUSLocale } from "../../lib/utils";
import EmptyCart from "./Cart/EmptyCart";

import toast from "react-hot-toast";

const Cart = () => {
    const cartRef = useRef();
    const {totalPrice,totalQuantities,cartItems,setShowCart,
        setCartItems,setTotalPrice, setTotalQuantities, onRemove,} = useStateContext();

    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);    

    // ✅ Validate inputs dynamically
    const validateInputs = (email, mobile) => {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const mobileValid = /^\d{11}$/.test(mobile);
        setIsValid(emailValid && mobileValid);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateInputs(newEmail, mobile);
    };

    const handleMobileChange = (e) => {
        const newMobile = e.target.value;
        setMobile(newMobile);
        validateInputs(email, newMobile);
    };

    const handleCheckout = async () => {
        if (!isValid) {
            toast.error("Please enter a valid email and phone number.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: cartItems,
                email,
                mobile,
            }),
            });

            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.message || "Failed to save order");
            }


            // ✅ Save order ID to state
            alert(response.ok ? `Your Order ${data._id.toString()} is saved successfully! Please Remember it`
                        : "Failed to save order");
            //toast.success(`Your Order ${data._id.toString()} is saved successfully!`);

            // Clear cart and run animation
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantities(0);

        } catch (err) {
            console.error(err);
            toast.error("Failed to save order");
        } finally {
            setLoading(false);
        }
    };

    
return (
    <div className="cart-wrapper" ref={cartRef}>
        <div className="cart-container">
            <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
                <AiOutlineLeft />
                <span className="heading">Your Cart</span>
                <span className="cart-num-items">({totalQuantities} items)</span>
            </button>

            {cartItems.length < 1 && (
                <EmptyCart>
                    <Link href="/">
                        <button type="button" onClick={() => setShowCart(false)} className="btn">
                            Continue Shopping
                        </button>
                    </Link>
                </EmptyCart>
            )}

            <div className="product-container">
                {cartItems.length >= 1 && cartItems.map((item) => (
                    <>
                        <div className="product" key={item._id}>
                            <button type="button"  className="remove-item" onClick={() => onRemove(item)}        >
                                <TiDeleteOutline />
                            </button>

                            <Image  src={(item?.image)} alt={item?.name?.en || item?.name} className="cart-product-image"  width={100} height={100} />
                            
                            <div className="item-desc">
                                <div>
                                    {/* 🧠 Show combo readable name if exists */}
                                    <span style={{ fontWeight: "600", display: "block" }}>
                                        {item.name?.en || item.name || item.displayName }
                                    </span>

                                    <span style={{ display: "block", marginTop: "8px" }}>
                                        {item.quantity} @ {item.price} EGP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            {cartItems.length >= 1 && (
                <div className="cart-bottom">
                     <div className="customer-info">
                        <label>Enter Valid Email:</label>
                        <input  className="input-field" type="email"  placeholder="Enter your email"         value={email}   required
                            onChange={handleEmailChange} 
                        />
                        <label>Enter Phone Number (11 digits):</label>
                        <input  className="input-field" type="tel"    placeholder="Enter your phone number"  value={mobile}  required
                            onChange={handleMobileChange}
                        />
                    </div>
                    
                    <div className="total">
                        <h3>Subtotal including 50 EGP for Shipping:</h3>
                        <h3>جنيه{eUSLocale(totalPrice + 50)}</h3>
                    </div>
                    
                    <div className="btn-container">
                        <button type="button" className="btn" onClick={handleCheckout} disabled={!isValid || loading} 
                            style={{
                            opacity: !isValid || loading ? 0.5 : 1,
                            cursor: !isValid || loading ? "not-allowed" : "pointer",
                            }}>
                            {loading ? "Processing..." : "Place Order"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
);
};

export default Cart;