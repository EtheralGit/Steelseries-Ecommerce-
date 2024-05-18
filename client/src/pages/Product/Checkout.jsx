// import npm file
import React, { useState } from "react";
import { useEffect } from "react";
// import code file
import useGetCart from "../../hooks/productHooks/useGetCart";
import useCustomHook from "../../utils/zustand";
import CheckoutCart from "../../components/CheckoutCart";
// import react icons
import { FaPaypal } from "react-icons/fa";
import { LiaCcAmex } from "react-icons/lia";
import { FaCcDiscover } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { BsCart, BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [promo, setPromo] = useState(false);
  const { cart } = useCustomHook();
  const { cartLoading, fetchCart, getCart } = useGetCart();
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchCart(cart);
  }, [cart]);
  const calculateSubtotal = () => {
    let subtotal = 0;
    getCart.forEach((item) => {
      if (item._id) {
        const countIds = cart.reduce((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});
        const quantity = countIds[item._id] || 0;
        subtotal += item.price * quantity;
      }
    });
    return subtotal.toFixed(2);
  };

  const handleBack = () => {
    setTimeout(() => {
      navigate(-1);
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setInvalid(false);
    setTimeout(() => {
      setLoading(false);
      if (input !== "SOUND20") {
        setInvalid(true);
        return false;
      } else {
        const discountedTotal = parseFloat(calculateSubtotal()) * 0.8;
        setTotal(discountedTotal.toFixed(2));
        setInput("123QWEASDZXC");
        return true;
      }
    }, 1000);
  };
  return (
    <div
      className={`min-h-screen relative bg-secondary p-16 flex justify-center cursor-pointer ${
        getCart.length > 0 ? "" : "items-center"
      }`}
    >
      <div
        className={`flex flex-col gap-2 items-center ${
          getCart.length > 0 ? "hidden" : ""
        }`}
      >
        <BsCart className="text-tertiary w-32 h-32" />
        <h1 className="text-3xl text-tertiary font-bold mt-2">
          Your Cart is Empty
        </h1>
        <p className="text-3xl text-tertiary opacity-90 mt-2">
          Let's fill it up!
        </p>
      </div>
      <IoMdArrowRoundBack
        className="absolute left-72 text-white w-12 h-12 hover:scale-105 duration-150"
        onClick={handleBack}
      />
      <div className="flex gap-12">
        <div className="w-full">
          <h1
            className={`text-start text-lg text-tertiary font-medium pl-4 ${
              getCart.length > 0 ? "" : "hidden"
            }`}
          >
            Cart{" "}
            <span className="opacity-70 font-normal text-sm">
              ({cart.length} item)
            </span>
          </h1>
          {getCart.length > 0
            ? getCart.map((item, index, lastIndex) => (
                <CheckoutCart
                  key={item._id}
                  index={index}
                  lastIndex={index === getCart.length - 1}
                  item={item}
                />
              ))
            : ""}
        </div>
        <div
          className={`w-[35rem] h-[55vh] rounded-sm bg-gray-900 bg-opacity-80 p-8 ${
            getCart.length > 0 ? "" : "hidden"
          }`}
        >
          <h1 className="text-tertiary font-bold text-4xl">Total</h1>
          <div className="flex justify-between items-center mt-8">
            <h3 className="text-tertiary text-lg font-medium opacity-90 ">
              Subtotal
            </h3>
            <h3 className="text-tertiary text-md opacity-90 ">
              ${calculateSubtotal()}
            </h3>
          </div>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-tertiary text-lg font-medium opacity-90 ">
              Shipping
            </h3>
            <h3 className="text-tertiary text-md opacity-90 ">Free</h3>
          </div>
          <div className="w-full border-b border-white border-opacity-60 h-2 mt-2"></div>
          <div className="my-4">
            <h1
              className={`text-white text-lg cursor-pointer inline-block ${
                promo ? "hidden" : ""
              }`}
              onClick={() => setPromo(true)}
            >
              + Add Promo Code
            </h1>
            <form
              onSubmit={handleSubmit}
              className={`${promo ? "" : "hidden"}`}
            >
              <h1 className="text-tertiary text-lg mb-2 flex justify-between items-center">
                <span>Promo Code</span>
                {input === "123QWEASDZXC" ? (
                  <span className="opacity-80 text-sm italic">
                    20% Discount
                  </span>
                ) : (
                  ""
                )}
                {invalid ? (
                  <span className="opacity-80 text-xs italic">
                    Please input the valid code
                  </span>
                ) : (
                  ""
                )}
              </h1>
              <div className="flex items-center gap-4">
                <h1
                  className={`w-2/3 text-xl ${
                    input === "123QWEASDZXC" ? "" : "hidden"
                  }`}
                >
                  SOUND20
                </h1>
                <input
                  type="text"
                  className={`px-4 py-2 w-2/3 bg-transparent border-tertiary border rounded-sm outline-none border-opacity-60
                  ${input === "123QWEASDZXC" ? "hidden" : ""}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="w-1/3 h-10 bg-tertiary text-secondary text-lg font-medium rounded-sm cursor-pointer 
                hover:opacity-90 duration-300"
                  type="submit"
                >
                  {input === "123QWEASDZXC" ? (
                    <div className="w-full flex justify-center items-center">
                      <FaCheck className="w-4 h-4 " />
                    </div>
                  ) : loading ? (
                    <span className="loading loading-dots"></span>
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="w-full border-b border-white border-opacity-60 h-2 mt-2"></div>
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-tertiary text-xl font-medium opacity-90 ">
              Est. total
            </h3>
            <h3 className="text-tertiary text-lg opacity-90 ">
              {input === "123QWEASDZXC"
                ? `$${total}`
                : `
             $${calculateSubtotal()}`}
            </h3>
          </div>
          <button className="w-full h-14 bg-secondary text-white text-xl mt-4 rounded-sm font-bold hover:opacity-80 duration-300 active:scale-75 ">
            Proceed to checkout
          </button>
          <p className="text-tertiary opacity-80 text-sm w-2/3 mt-4">
            Free & speedy shipping Extended 30-day return policy
          </p>
          <a className="underline text-sm cursor-pointer">
            Membership benefits
          </a>
          <div className="flex justify-between items-center mt-8">
            <FaPaypal className="w-9 h-9" />
            <LiaCcAmex className="w-9 h-9" />
            <FaCcDiscover className="w-9 h-9" />
            <FaCcMastercard className="w-9 h-9" />
            <FaCcVisa className="w-9 h-9" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
