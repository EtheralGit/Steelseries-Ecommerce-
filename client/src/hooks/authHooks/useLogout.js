// import npm file
import { useState } from "react";
// import code file
import { useAuthContext } from "../../../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });

      const data = await res.json();
      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      console.log("Error in useLogout Hooks : ", error.message);
    } finally {
      setLoading(false);
    }
  };
};
