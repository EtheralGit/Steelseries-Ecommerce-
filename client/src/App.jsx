import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import authcontext
import { useAuthContext } from "../context/AuthContext.jsx";
// import coding file
import Hero from "./pages/Home/Hero.jsx";
import SignUp from "./pages/Signup/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Headset from "./pages/Shop/Headset.jsx";
import Microphone from "./pages/Shop/Microphone.jsx";
import Speaker from "./pages/Shop/Speaker.jsx";
import Keyboard from "./pages/Shop/Keyboard.jsx";
import Mice from "./pages/Shop/Mice.jsx";
import Addnew from "./pages/Product/Addnew.jsx";
import SelectedProduct from "./pages/Product/SelectedProduct.jsx";
import Checkout from "./pages/Product/Checkout.jsx";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        {/* tab */}
        <Route path="/shop-headset" element={<Headset />} />
        <Route path="/shop-microphone" element={<Microphone />} />
        <Route path="/shop-speaker" element={<Speaker />} />
        <Route path="/shop-keyboard" element={<Keyboard />} />
        <Route path="/shop-mice" element={<Mice />} />
        {/* admin add new */}
        <Route
          path="/shop/add-new"
          element={
            authUser ? (
              authUser.email === "admin@gmail.com" ? (
                <Addnew />
              ) : (
                <Navigate to="/shop" />
              )
            ) : (
              <Navigate to="/shop" />
            )
          }
        />
        <Route path="/product/:id" element={<SelectedProduct />} />
        <Route path="/shop/checkout" element={<Checkout />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
