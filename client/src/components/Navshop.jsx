// import usestate
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import assets
import logo from "../assets/logo.png";
// import react icons
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { MdArrowDropUp } from "react-icons/md";
// import code
import useCustomHook from "../utils/zustand";
import useGetCart from "../hooks/productHooks/useGetCart";
import Cart from "./Cart";
import useSearchProduct from "../hooks/productHooks/useSearchProduct";

const Navshop = () => {
  const navigate = useNavigate();

  // usestate
  const [activeCart, setActiveCart] = useState(false);
  const [cartLengthChanged, setCartLengthChanged] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);
  const [newLoad, setNewLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const { tabLoading, setTabLoading } = useCustomHook();
  const { cart } = useCustomHook();
  const { fetchCart, getCart } = useGetCart();
  const { searchLoading, searchProduct } = useSearchProduct();

  useEffect(() => {
    fetchCart(cart);
    if (cart.length > 0) {
      setCartLengthChanged(true);
      setTimeout(() => {
        setCartLengthChanged(false);
      }, 1000);
    }
  }, [cart]);

  // get url
  const location = useLocation();
  const url = location.pathname;

  // get localstorage
  const getLocalUser = localStorage.getItem("user");
  const user = JSON.parse(getLocalUser);

  // handle login click
  const handleLogin = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      navigate("/login");
    }, 1000);
  };

  const handleAddnew = () => {
    setNewLoad(true);
    setTimeout(() => {
      setNewLoad(false);
      navigate("/shop/add-new");
    }, 1000);
  };

  const handleCheckout = () => {
    setTimeout(() => {
      navigate("/shop/checkout");
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchProduct(search);
  };

  return (
    <div className="w-full z-2">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-16 items-center">
          <h1 className="md:text-2xl text-xl text-tertiary font-medium flex items-center gap-2">
            <img src={logo} className="w-8 h-6" />
            <p>SteelSeries</p>
          </h1>
          <div className="flex gap-8 items-center ">
            <button
              className={`text-md text-tertiary font-medium opacity-90 hover:opacity-100 border-primary
            ${url === "/shop" && "border-b-2"}`}
              onClick={() => {
                setTabLoading(true);
                setTimeout(() => {
                  navigate("/shop");
                  setTabLoading(false);
                }, 500);
              }}
              disabled={tabLoading}
            >
              Home
            </button>
            <button
              className={`text-md text-tertiary font-medium opacity-90 hover:opacity-100 border-primary
            ${url === "/shop-headset" && "border-b-2"}`}
              onClick={() => {
                setTabLoading(true);
                setTimeout(() => {
                  navigate("/shop-headset");
                  setTabLoading(false);
                }, 500);
              }}
              disabled={tabLoading}
            >
              Headset
            </button>
            <button
              className={`text-md text-tertiary font-medium opacity-90 hover:opacity-100 border-primary
            ${url === "/shop-microphone" && "border-b-2"}`}
              onClick={() => {
                setTabLoading(true);
                setTimeout(() => {
                  navigate("/shop-microphone");
                  setTabLoading(false);
                }, 500);
              }}
              disabled={tabLoading}
            >
              Microphones
            </button>
            <button
              className={`text-md text-tertiary font-medium opacity-90 hover:opacity-100 border-primary
            ${url === "/shop-speaker" && "border-b-2"}`}
              onClick={() => {
                setTabLoading(true);
                setTimeout(() => {
                  navigate("/shop-speaker");
                  setTabLoading(false);
                }, 500);
              }}
              disabled={tabLoading}
            >
              Speakers
            </button>
            <button
              className={`text-md text-tertiary font-medium opacity-90 hover:opacity-100 border-primary
            ${url === "/shop-keyboard" && "border-b-2"}`}
              onClick={() => {
                setTabLoading(true);
                setTimeout(() => {
                  navigate("/shop-keyboard");
                  setTabLoading(false);
                }, 500);
              }}
              disabled={tabLoading}
            >
              Keyboard
            </button>
            <button
              className={`text-md text-tertiary font-medium opacity-90 hover:opacity-100 border-primary
            ${url === "/shop-mice" && "border-b-2"}`}
              onClick={() => {
                setTabLoading(true);
                setTimeout(() => {
                  navigate("/shop-mice");
                  setTabLoading(false);
                }, 500);
              }}
              disabled={tabLoading}
            >
              Mice
            </button>
          </div>
        </div>
        <div className="relative flex gap-4 items-center">
          <form onSubmit={handleSearch}>
            <label className="input input-md flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </form>
          {user ? (
            <div className="flex items-center gap-4">
              {user.email === "admin@gmail.com" ? (
                <button
                  className="text-white text-lg font-medium hover:scale-105 duration-300 w-44"
                  onClick={handleAddnew}
                >
                  {newLoad ? (
                    <span className="loading loading-dots"></span>
                  ) : (
                    "+ Add New Product"
                  )}
                </button>
              ) : (
                <button className={`relative `}>
                  <IoCartOutline
                    className="w-7 h-7 text-tertiary hover:scale-110 duration-300"
                    onClick={() => {
                      setTimeout(() => {
                        setActiveCart(!activeCart);
                      }, 100);
                      setActiveProfile(false);
                    }}
                  />
                  <span
                    className={`${
                      cart.length > 0 &&
                      `absolute bg-primary w-4 h-4 rounded-full top-0 right-0 text-white text-xs font-bold ${
                        cartLengthChanged ? "animate-scale" : ""
                      }`
                    }`}
                  >
                    {cart.length === 0 ? "" : cart.length}
                  </span>
                  <div
                    className={`absolute top-[5rem] right-[-1rem] transition-all duration-300 min-w-[26rem] z-[2] bg-alt p-3 pb-4 rounded-sm
      ${activeCart ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
                  >
                    {getCart.length > 0 ? (
                      <div>
                        <h1 className="text-start text-lg text-black font-medium pl-4">
                          Cart{" "}
                          <span className="opacity-70 font-normal text-sm">
                            ({cart.length} item)
                          </span>
                        </h1>
                        {getCart.map((item, index) => (
                          <Cart
                            key={item._id}
                            index={index}
                            lastIndex={index === getCart.length - 1}
                            item={item}
                          />
                        ))}
                        <div className="flex gap-2 w-full px-4 py-1 mt-4">
                          <button
                            className="bg-secondary opacity-90 rounded-sm text-lg font-bold text-tertiary w-full h-14"
                            onClick={handleCheckout}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-black font-bold text-lg w-full flex flex-col items-center justify-center p-4">
                        <LuShoppingCart className="w-12 h-12 mb-2" />
                        <p className="text-2xl">Your Cart is Empty</p>
                        <p className="text-lg opacity-70">
                          Start adding items to your cart now!
                        </p>
                      </div>
                    )}
                    <div className="relative w-full h-full z-40">
                      <MdArrowDropUp className="text-alt w-12 h-12 absolute -top-6 right-0  z-0" />
                    </div>
                  </div>
                </button>
              )}

              <button
                className=""
                onClick={() => {
                  setTimeout(() => {
                    setActiveProfile(!activeProfile);
                  }, 200);
                  setActiveCart(false);
                }}
              >
                <CgProfile className="w-7 h-7 text-tertiary hover:scale-110 duration-300" />
              </button>
              <div
                className={`absolute right-0 bottom-[-9rem] transition-all duration-300 z-[2] ${
                  activeProfile
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-6"
                }`}
              >
                {activeProfile ? (
                  <div className="relative w-[19rem] h-24 bg-white rounded-md p-4 z-[2]">
                    <div className="flex gap-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full">
                          <img src={user.profilePic} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-secondary text-lg font-semibold">
                          {user.username}
                        </h1>
                        <p className="text-secondary text-lg opacity-80 -mt-2">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <MdArrowDropUp className="text-white w-12 h-12 absolute -top-6 -right-2 " />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <button
              className="text-lg text-white opacity-95 w-12"
              onClick={handleLogin}
            >
              {load ? <span className="loading loading-dots"></span> : "Login"}
            </button>
          )}
        </div>
      </div>
      <div className="w-full border-b-2 opacity-70 border-solid mt-4"></div>
    </div>
  );
};

export default Navshop;
