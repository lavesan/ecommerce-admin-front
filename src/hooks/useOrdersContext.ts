import { OrdersContext } from "@context/OrdersContext";
import { useContext } from "react";

export const useOrdersContext = () => {
  return useContext(OrdersContext);
};
