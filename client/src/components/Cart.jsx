// import npm
import React from "react";
import { useNavigate } from "react-router-dom";
// import code file
import useCustomHook from "../utils/zustand";

const Cart = ({ item, index, lastIndex }) => {
  const navigate = useNavigate();
  const { cart } = useCustomHook();

  const countIds = cart.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const quantity = countIds[item._id] || 0;

  const handleTitle = () => {
    setTimeout(() => {
      navigate(`/product/${item._id}`);
    }, 500);
  };

  return (
    <div className="w-full flex flex-col px-2 py-1">
      <div className="flex gap-2">
        <img
          src={`http://localhost:5000/${item.img}`}
          alt=""
          className="w-32"
        />
        <div className="flex flex-col mt-4 items-start">
          <button
            className="text-sm text-black font-medium hover:underline"
            onClick={handleTitle}
          >
            {item.name}
          </button>
          <p className="text-black opacity-90 font-bold text-xs mt-[2px]">
            $ {item.price}
          </p>
          <p className="text-black font-medium text-sm mt-4">
            Quantity: {quantity}
          </p>
        </div>
      </div>
      <span
        className={`${
          lastIndex
            ? ""
            : "w-full border-b-2 border-black border-opacity-20 mt-2"
        }`}
      ></span>
    </div>
  );
};

export default Cart;
