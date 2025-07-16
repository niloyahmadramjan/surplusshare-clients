import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import FoodAnimation from "../LoadingAnimation/FoodLoading";

const LogOut = () => {
  const { handleLogOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAndRedirect = async () => {
      try {
        await handleLogOut();
        navigate("/login", { replace: true }); 
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/login", { replace: true }); 
      }
    };

    logoutAndRedirect();
  }, [handleLogOut, navigate]);

  return <FoodAnimation></FoodAnimation>
};

export default LogOut;
