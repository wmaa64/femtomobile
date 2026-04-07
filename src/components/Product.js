import React, {useState} from "react";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import { NextSeo } from "next-seo";

const  toTitleCase = (str)=> {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const Product = ({ product }) => {
    const seoProductName = product.name.en || "Product";
    const { cartItems, decQty, incQty, qty, onAdd, onRemove, toggleCartItemQuantity, setShowCart } = useStateContext();
    //const [productQty, setProductQty] = useState(0);

    const productInCart = cartItems.find((item) => item._id === product._id);

    const productQty = productInCart ? productInCart.quantity : 0;

    const handleAddToCart = () => {
        if (product) {
            onAdd(product, 1); // add 1 item to cart
            //setProductQty((previous) => previous + 1);
        }
    };

    const handleRemoveFromCart = () => {
        if (productQty > 1) {
            toggleCartItemQuantity(product._id, "dec");
            //setProductQty((previous) => previous - 1);
        } else if (productQty === 1) {
            onRemove(product);
            //setProductQty(0);
        }
    };

return (
<>
    <NextSeo
        title={`${toTitleCase(seoProductName)} - Cat's Best | Femtotrade`}
        description="Cat's Best - Original litter - Active against urine and odours - 100% natural - 100% biodegradable - Dust-free - Long-lasting - Odour control - Easy to clean"
    />

    <div className="product-card">
        {/*<Link href={`/product/${product._id}`}   className="product-link">*/}
            <div className="product-content">
                <div className="image-wrapper">
                    <Image  src={product.image}  alt={product.name.en} fill className="product-image" /> 
                </div>                         
                <p className="product-name">{product.name.en}</p>
                <p className="product-name" style={{ color: "green"}}>
                    {product.price.toLocaleString("ar-EG", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    })}  جنيه مصرى
                </p>


                <p className="product-description">
                    {product.description.ar}
                </p>
                <div className="quantity-desc">
                    {productQty > 0 && 
                        <button type="button" className="minus" onClick={handleRemoveFromCart}>
                            <AiOutlineMinus />
                        </button>
                    }
                    {productQty > 0 && <span>{productQty}</span>}
                    <button type="button" className="plus" onClick={handleAddToCart}>
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
        {/*</Link>*/}
    </div>
</>

);
};

export default Product;
