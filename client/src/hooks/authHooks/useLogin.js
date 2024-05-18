// import npm
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import codefile
import { useAuthContext } from "../../../context/AuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);

      setTimeout(() => {
        navigate("/shop");
      }, 1000);
    } catch (error) {
      console.log("Error in useLogin hooks: ", error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
