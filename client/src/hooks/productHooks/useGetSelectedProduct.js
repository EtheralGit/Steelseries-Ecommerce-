// import npm file
import { useState, useEffect } from "react";

const useGetSelectedProduct = (Id) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const selectedProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/product/get/selected/${Id}`);

        const data = await res.json();
        setSelected(data);
      } catch (error) {
        console.log("Error in useGetSelectedProduct hooks :", error.message);
      } finally {
        setLoading(false);
      }
    };
    selectedProduct();
  }, []);
  return { loading, selected };
};

export default useGetSelectedProduct;
