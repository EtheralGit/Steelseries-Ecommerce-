// import npm file
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useNew = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const newProduct = async (name, description, type, price, file1, file2) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("file", file1);
    formData.append("file", file2);
    setLoading(true);
    try {
      const res = await fetch("/api/product/add-new", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      setTimeout(() => {
        setLoading(false);
        navigate("/shop");
      }, 1000);
    } catch (error) {
      console.log("Error in useNew hooks :", error.message);
      setLoading(false);
    }
  };
  return { loading, newProduct };
};

export default useNew;
