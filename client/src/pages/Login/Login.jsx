// import npm file
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import assets
import logo from "../../assets/logo.png";
import goggle from "../../assets/goggle.webp";
// import coding file
import useLogin from "../../hooks/authHooks/useLogin.js";

const SignUp = () => {
  const [load, setLoad] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleAccount = () => {
    setTimeout(() => {
      setLoad(false);
      navigate("/signup");
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="auth_bg flex h-screen">
      <div className="w-2/3 h-full flex justify-center items-center gap-8">
        <div className="w-1/2">
          <div className="flex gap-2 items-center mb-12">
            <img src={logo} alt="" className="w-12 h-10" />
            <h1 className="text-white 2xl:text-5xl text-3xl font-bold">
              SteelSeries.
            </h1>
          </div>
          <p className="text-white 2xl:text-3xl text-xl font-medium mt-2 ">
            Precision-driven gaming gear, empowering champions to conquer the
            competition
          </p>
          <p className="text-white opacity-60 text-xl mt-2">
            Strength | Precision | Triumph
          </p>
        </div>
      </div>
      <div className="bg-secondary xl:w-1/2 w-1/2 h-full flex justify-center items-center rounded-r-xl">
        {load ? (
          <span className="loading loading-lg loading-dots"></span>
        ) : (
          <div
            className="w-2/3 2xl:h-3/4 bg-secondary rounded-lg shadow-md mx-auto my-auto p-12 bg-clip-padding backdrop-filter 
          backdrop-blur-sm bg-opacity-10 mt-56
          "
          >
            <h1 className="text-white text-3xl font-semibold text-center mb-4">
              Login
            </h1>
            <form onSubmit={handleLogin}>
              <div className="w-full items-center mb-4">
                <label
                  htmlFor="email"
                  className="text-white 2xl:text-xl text-lg"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="2xl:text-lg text-md border border-solid border-white border-opacity-60 bg-transparent text-md rounded-md block px-5 py-3 
          text-white outline-none w-full "
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full items-center mb-4">
                <label
                  htmlFor="password"
                  className="text-white 2xl:text-xl text-lg"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="2xl:text-lg text-md border border-solid border-white border-opacity-60 bg-transparent text-md rounded-md block px-5 py-3 
          text-white outline-none w-full "
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
              <a
                className="text-white mb-4 hover:underline 2xl:text-xl text-lg cursor-pointer inline-block"
                onClick={() => {
                  setLoad(true);
                  handleAccount();
                }}
              >
                Don't have an account?
              </a>
              <div className="flex flex-col gap-4 justify-center items-center mt-4">
                <span className="text-tertiary text-lg">Or</span>
                <div className="flex justify-center items-center gap-2 bg-tertiary w-full rounded-full cursor-pointer hover:bg-white">
                  <img src={goggle} alt="" className="w-14 h-14" />
                  <h1 className="text-secondary text-lg font-bold">
                    Login with goggle
                  </h1>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center 2xl:mt-8 mt-4">
                <button
                  className="text-xl text-tertiary w-40 h-16 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-l 
          dark:focus:ring-purple-800 font-medium duration-500 mt-12 cursor-pointer"
                >
                  {loading ? (
                    <span className="loading loading-dots"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
