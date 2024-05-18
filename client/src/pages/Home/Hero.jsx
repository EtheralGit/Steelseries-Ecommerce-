// impoort npm
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import code file
import Navbar from "../../components/Navbar";
// import assets
import logo from "../../assets/logo.png";
import home from "../../assets/home.png";

const Hero = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleShop = () => {
    setTimeout(() => {
      setLoading(false);
      navigate("/shop");
    }, 1000);
  };

  return (
    <div className="min-h-screen relative home_bg md:px-28 py-8 ">
      <Navbar />

      <div className="w-full h-full flex justify-between items-center py-20">
        <div className="w-1/2 h-full flex flex-col z-[2] mb-12">
          <h2 className="flex items-center gap-1 text-tertiary text-md">
            <img src={logo} alt="" className="w-6 h-5" />
            <h1>SteelSeries</h1>
          </h2>
          <h1 className="text-4xl text-tertiary font-bold mt-2">
            Precision-driven gaming gear, empowering champions to conquer the
            competition
          </h1>
          <div className="text-3xl gap-4 flex mt-4 font-bold text-tertiary">
            <h1>Strength</h1> |<h1 className="text-primary">Precision</h1> |
            <h1>Triumph</h1>
          </div>
          <button
            className="text-xl text-tertiary w-40 h-16 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-l 
          dark:focus:ring-purple-800 font-medium duration-500 mt-12 cursor-pointer"
            onClick={() => {
              setLoading(true);
              handleShop();
            }}
          >
            {loading ? (
              <span className="loading loading-dots"></span>
            ) : (
              "Shop Now"
            )}
          </button>
          <div className="w-full flex items-center gap-12 mt-24">
            <div className="flex gap-4 items-center z-[2] font-bold hover:scale-105 duration-300">
              <h1 className="text-5xl text-primary">20+</h1>
              <div className="flex flex-col text-xl text-tertiary">
                <h3>Years Of</h3>
                <h3>Experience</h3>
              </div>
            </div>
            <div className="flex gap-4 items-center z-[2] font-bold hover:scale-105 duration-300">
              <h1 className="text-5xl text-primary">20+</h1>
              <div className="flex flex-col text-xl text-tertiary">
                <h3>Years Of</h3>
                <h3>Trusted Collaborations</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-end mt-12">
          <img
            src={home}
            alt=""
            className="w-[640px] z-[2] hover:scale-105 duration-1000"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
