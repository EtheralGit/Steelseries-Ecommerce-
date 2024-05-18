// import npm file
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// codefile
import useGetSelectedProduct from "../../hooks/productHooks/useGetSelectedProduct";
// react icon
import { IoMdArrowRoundBack } from "react-icons/io";
import useCustomHook from "../../utils/zustand";

const SelectedProduct = () => {
  const [load, setload] = useState(false);
  const { setCart } = useCustomHook();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, selected } = useGetSelectedProduct(id);

  const capitalize = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleBack = () => {
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  const handleAddCart = () => {
    setload(true);
    setTimeout(() => {
      setload(false);
      setCart(selected._id);
      navigate(-1);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="h-12 bg-gray-800 bg-opacity-15 top-0 right-0 left-0 w-full text-center p-4 text-tertiary text-md font-medium">
        Feeling like an upgrade? Use code SOUND20 for 20% OFF through April 28.
        Exclusions apply.
      </div>
      <button onClick={handleBack}>
        <IoMdArrowRoundBack className="text-white text-5xl ml-8 mt-4 cursor-pointer hover:scale-110 duration-150" />
      </button>
      {selected.length < 1 ? (
        "..."
      ) : (
        <div className="p-16 flex gap-12">
          <div>
            <h1 className="text-white text-md mb-2 font-medium">
              Gaming Product / {capitalize(selected.type)} / {selected.name}
            </h1>
            <img
              src={`http://localhost:5000/${selected.mainImg}`}
              alt=""
              className="h-[45rem]"
            />
          </div>
          <div className="w-1/3">
            <h1 className="text-4xl text-tertiary font-bold mt-8">
              {selected.name}
            </h1>
            <p className="text-lg text-white opacity-95 mt-8 whitespace-pre-wrap">
              {selected.description}
            </p>
            <h2 className="text-white font-bold text-2xl mt-12">
              $ {selected.price}
            </h2>
            <button
              className="text-white bg-gray-900 bg-opacity-50 hover:bg-opacity-100 text-xl w-full h-16 rounded-md font-bold mt-12
            duration-150"
              onClick={handleAddCart}
            >
              {load ? (
                <span className="loading loading-dots"></span>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedProduct;
