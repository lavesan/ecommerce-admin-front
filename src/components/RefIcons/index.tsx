import { forwardRef } from "react";
import {
  HiGift,
  HiPencil,
  HiServer,
  HiShoppingBag,
  HiShoppingCart,
} from "react-icons/hi";

export const HiPencilRef = forwardRef((props, ref) => <HiPencil {...props} />);
export const HiServerRef = forwardRef((props, ref) => <HiServer {...props} />);
export const HiShoppingCartRef = forwardRef((props, ref) => (
  <HiShoppingCart {...props} />
));
export const HiGiftRef = forwardRef((props, ref) => <HiGift {...props} />);
export const HiShoppingBagRef = forwardRef((props, ref) => (
  <HiShoppingBag {...props} />
));
