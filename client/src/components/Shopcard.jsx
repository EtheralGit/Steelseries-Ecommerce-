// import npm
import React from "react";
import { useLocation } from "react-router-dom";
// import file
import useGetAllProduct from "../hooks/productHooks/useGetAllProduct";
import Card from "./Card";
import useGetType from "../hooks/productHooks/useGetType";
import useCustomHook from "../utils/zustand";
// import react icon
import { IoMdArrowRoundBack } from "react-icons/io";

const Shopcard = () => {
  const location = useLocation();
  const url = location.pathname;
  const parts = url.split("-");
  const type = parts[1];

  const { tabLoading } = useCustomHook();
  const { loading, product } = useGetAllProduct();
  const { typeLoading, typeProduct } = useGetType(type);
  const { sProduct, setSProduct } = useCustomHook();

  const titleMap = {
    "/shop": "Explore Our New Product",
    "/shop-headset": "Headset",
    "/shop-keyboard": "Keyboard",
    "/shop-mice": "Mice",
    "/shop-microphone": "Microphones",
    "/shop-speaker": "Speakers",
  };

  const title = titleMap[url] || "";

  const sortedSProduct = sProduct.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const renderProductCards = (items) => {
    return items.map((item) => <Card key={item._id} item={item} />);
  };

  let renderedCards;

  if (type !== undefined) {
    if (Array.isArray(typeProduct)) {
      const sortedTypeProduct = typeProduct.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      renderedCards =
        sortedTypeProduct.length > 0
          ? renderProductCards(sortedTypeProduct)
          : "No products found for this type";
    } else {
      renderedCards = "Type product data is not available";
    }
  } else {
    const sortedProduct = product.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    renderedCards =
      sortedProduct.length > 0
        ? renderProductCards(sortedProduct)
        : "No products found";
  }

  const handleBack = () => {
    setTimeout(() => {
      setSProduct([]);
    }, 150);
  };

  return (
    <div className="py-8 z-[-1]">
      {tabLoading ? (
        <div className="h-[75vh] flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl text-tertiary font-semibold">
            {sProduct.length > 0 ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="active:scale-75 duration-150"
                >
                  <IoMdArrowRoundBack className="w-12 h-12" />
                </button>
                <h1>Back</h1>
              </div>
            ) : (
              title
            )}
          </h1>

          <div className="grid grid-cols-4 mt-8 gap-8">
            {sortedSProduct.length > 0
              ? sortedSProduct.map((item) => (
                  <Card key={item._id} item={item} />
                ))
              : renderedCards}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopcard;
