// import npm file
import { useLocation } from "react-router-dom";
// import code file
import Navshop from "../../components/Navshop";
import Shopcard from "../../components/Shopcard";

const Keyboard = () => {
  return (
    <div className="min-h-screen bg-secondary px-24 py-4">
      <Navshop />
      <Shopcard />
    </div>
  );
};

export default Keyboard;
