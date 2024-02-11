import { UserContext } from "@/context/userContext";
import { useContext } from "react";


const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useContext must be used within an userProvider");
  }
  return context;
};

export default useUser;
