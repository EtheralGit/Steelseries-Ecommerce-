// import npm file
import { useState, useEffect } from "react";

const useGetAllProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/product/all");

        const data = await res.json();
        if (data.error) {
          return;
        }
        setProduct(data);
      } catch (error) {
        console.log("Error in useGetAllProduct hooks : ", error.message);
        setLoading(false);
      }
    };
    getAllProduct();
  }, []);
  return { loading, product };
};

export default useGetAllProduct;
