// import npm file
import { useState } from "react";
import toast from "react-hot-toast";
// import code file
import useCustomHook from "../../utils/zustand";

const useSearchProduct = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const { setSProduct } = useCustomHook();

  const searchProduct = async (search) => {
    setSearchLoading(true);
    try {
      const res = await fetch("/api/product/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search }),
      });

      const data = await res.json();
      if (data.error) {
        setSearchLoading(true);
        return toast.error(data.error);
      }

      setSearchLoading(false);
      setSProduct(data);
    } catch (error) {
      console.log("Error in useSearchProduct hook: ", error.message);
    } finally {
      setSearchLoading(false);
    }
  };
  return { searchLoading, searchProduct };
};

export default useSearchProduct;
