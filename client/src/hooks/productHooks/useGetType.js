// import npm file
import { useState, useEffect } from "react";

const useGetType = (type) => {
  const [typeLoading, setTypeLoading] = useState(false);
  const [typeProduct, setTypeProduct] = useState(false);

  useEffect(() => {
    const getType = async () => {
      setTypeLoading(true);
      try {
        const res = await fetch(`/api/product/get/${type}`);

        const data = await res.json();
        setTypeProduct(data);
      } catch (error) {
        console.log("Error in useGetType hook: ", error.message);
      } finally {
        setTypeLoading(false);
      }
    };
    getType();
  }, [type]);
  return { typeLoading, typeProduct };
};

export default useGetType;
