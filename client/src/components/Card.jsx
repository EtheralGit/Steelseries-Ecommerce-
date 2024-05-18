// import npm
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import code file
import useCustomHook from "../utils/zustand";

const Card = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useCustomHook();

  const navigate = useNavigate();
  const isNew = (createdAt) => {
    const difference = new Date() - new Date(createdAt);
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const sliceDescription = (description) => {
    if (description.length > 100) {
      return description.slice(0, 100) + "...";
    } else {
      return description;
    }
  };

  const handleCard = () => {
    setTimeout(() => {
      navigate(`/product/${item._id}`);
    }, 500);
  };

  const handleAddCart = () => {
    setLoading(true);
    setCart(item._id);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative card w-[25rem] h-[35rem] bg-base-100 shadow-xl">
      <figure className="pt-2">
        <img
          src={`http://localhost:5000/${item.img}`}
          className="h-64 hover:scale-105 duration-300 cursor-pointer"
          onClick={handleCard}
        />
      </figure>
      <div className="card-body">
        <h2
          className="card-title text-tertiary text-md h-12"
          onClick={handleCard}
        >
          <span
            className="hover:underline duration-300 cursor-pointer mb-auto"
            onClick={handleCard}
          >
            {item.name}
          </span>

          <div className="ms-auto flex gap-2 mb-auto">
            <div className="badge badge-outline">{item.type}</div>
          </div>
        </h2>
        <p className="text-sm font-bold text-white opacity-90 h-4">
          ${item.price}
        </p>
        <p className="h-18">{sliceDescription(item.description)}</p>
        <div className="card-actions justify-end">
          <motion.button
            className="bg-secondary w-36 h-12 rounded-full font-medium text-white text-md hover:opacity-85"
            onClick={handleAddCart}
          >
            <motion.div
              initial={{ scale: loading ? 0 : 1 }}
              animate={{ scale: loading ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={`text-md text-white ${loading ? "" : "hidden"}`}
            >
              +1
            </motion.div>
            <motion.div
              initial={{ scale: loading ? 1 : 0 }}
              animate={{ scale: loading ? 0 : 1 }}
              transition={{ duration: 0.1 }}
              className={`text-md text-white ${loading ? "hidden" : ""}`}
            >
              Add to cart
            </motion.div>
          </motion.button>
        </div>
      </div>
      <div
        className={`absolute bottom-10 left-8 ${
          isNew(item.createdAt) === 0
            ? "badge badge-secondary w-20 h-8 text-lg"
            : ""
        }`}
      >
        {isNew(item.createdAt) === 0 ? "New" : ""}
      </div>
    </div>
  );
};

export default Card;
