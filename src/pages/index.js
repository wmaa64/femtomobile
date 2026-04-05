import React, {useState, useEffect} from "react";
import { NextSeo } from "next-seo";
import Product from '../components/Product';
import Image from "next/image";
import Styles from "../styles/index.module.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data client-side from API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/featured");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


return (
<>
  <NextSeo
    title="Pets Suppliers | Cat's Best | Femtotrade"
    description="Pet Suppliers in Egypt - Cat's Best - Original litter - Active against urine and odours - 100% natural - 100% biodegradable - Dust-free - Long-lasting - Odour control - Easy to clean "
  />

  <div className={Styles.section_container}>
    <Image
      src="/images/imageheader.jpg"
      alt="Pets Suppliers"
      fill
      className={Styles.section_image}
      priority={true} // optional, for faster LCP
    />
  </div>

  <div>
    { (loading) ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-container">
          {(products.length > 0) ? 
            (products.map((product) => (
              <Product key={product._id} product={product} />
            ))) : (
              <p>No featured products available.</p>
            )
          }
        </div>
        ) 
    }
  </div>
    
</>

)
};

export default Home;



