// import npm
import React from "react";
import { useNavigate } from "react-router-dom";
// import codefile
import useCustomHook from "../utils/zustand";
// import react icon
import { MdDelete } from "react-icons/md";

const CheckoutCart = ({ item, index, lastIndex }) => {
  const navigate = useNavigate();
  const { cart, setCart, removeCart, deleteCart } = useCustomHook();

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

  const handleAddCart = () => {
    setTimeout(() => {
      setCart(item._id);
    }, 250);
  };

  const handleRemoveCart = () => {
    setTimeout(() => {
      removeCart(item._id);
    }, 250);
  };

  const handleDeleteCart = () => {
    setTimeout(() => {
      deleteCart(item._id);
    }, 250);
  };

  return (
    <div className="w-full flex flex-col px-2 py-1">
      <div className="flex gap-2">
        <img
          src={`http://localhost:5000/${item.img}`}
          alt=""
          className="w-48"
        />
        <div className="flex flex-col mt-4 items-start w-full">
          <div className="flex justify-between items-center w-full">
            <button
              className="text-xl text-tertiary font-medium hover:underline"
              onClick={handleTitle}
            >
              {item.name}
            </button>
            <button onClick={handleDeleteCart}>
              <MdDelete className="w-6 h-6 text-white cursor-pointer" />
            </button>
          </div>
          <p className="text-tertiary opacity-90 font-bold text-md mt-[2px]">
            $ {item.price}
          </p>
          <div className="mt-8 flex justify-between items-center w-full">
            <p className="text-tertiary font-medium text-lg ">
              Quantity: {quantity}
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 rounded-md text-white text-2xl font-bold bg-gray-900 bg-opacity-80"
                onClick={handleAddCart}
              >
                +
              </button>
              <button
                className="px-3 rounded-md text-white text-2xl font-bold bg-gray-900 bg-opacity-80"
                onClick={handleRemoveCart}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
      <span
        className={`${
          lastIndex
            ? ""
            : "w-full border-b-2 border-tertiary border-opacity-60 mt-2"
        }`}
      ></span>
    </div>
  );
};

export default CheckoutCart;
