// import npm
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import assets
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [logLoading, setLogLoading] = useState(false);
  const [signLoading, setSignLoading] = useState(false);

  // get localstorage
  const data = localStorage.getItem("user");
  const profile = JSON.parse(data);

  const handleLoginClick = () => {
    setTimeout(() => {
      setLogLoading(false);
      navigate("/login");
    }, 1000);
  };

  const handleSignClick = () => {
    setTimeout(() => {
      setSignLoading(false);
      navigate("/signup");
    }, 1000);
  };
  return (
    <div className="border-1 border-b border-tertiary border-opacity-80 pb-2 z-[3]">
      <div className="flex justify-between items-center">
        <h1 className="md:text-2xl text-xl text-tertiary font-medium flex items-center gap-2">
          <img src={logo} className="w-8 h-6" />
          <p>SteelSeries</p>
        </h1>
        <ul className="flex gap-8 items-center">
          <li className="text-tertiary text-lg hover:scale-95 duration-150 cursor-pointer">
            Home
          </li>
          <li className="text-tertiary text-lg hover:scale-95 duration-150 cursor-pointer">
            Features
          </li>
          <li className="text-tertiary text-lg hover:scale-95 duration-150 cursor-pointer">
            Product
          </li>
        </ul>
        {data ? (
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={profile.profilePic} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              className="text-lg text-tertiary font-medium"
              onClick={() => {
                setLogLoading(true);
                handleLoginClick();
              }}
            >
              {logLoading ? (
                <span className="loading loading-dots"></span>
              ) : (
                "Login"
              )}
            </button>
            <button
              className="text-lg text-tertiary w-28 h-12 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-l 
dark:focus:ring-purple-800 font-medium duration-500 cursor-pointer"
              onClick={() => {
                setSignLoading(true);
                handleSignClick();
              }}
            >
              {signLoading ? (
                <span className="loading loading-dots"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
