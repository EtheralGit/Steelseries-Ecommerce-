// import npm file
import { useState, useEffect } from "react";

const useGetCart = () => {
  const [cartLoading, setCartLoading] = useState(false);
  const [getCart, setGetCart] = useState([]);

  const fetchCart = async (ids) => {
    setCartLoading(true);
    try {
      const res = await fetch("/api/product/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();
      setGetCart(data);
      setCartLoading(false);
    } catch (error) {
      console.log("Error in useGetCart hooks: ", error.message);
      setCartLoading(false);
    }
  };

  return { cartLoading, fetchCart, getCart };
};

export default useGetCart;
