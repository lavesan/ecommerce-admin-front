import { forwardRef } from "react";
import {
  HiEye,
  HiEyeOff,
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
export const HiEyeRef = forwardRef((props, ref) => <HiEye {...props} />);
export const HiEyeOffRef = forwardRef((props, ref) => <HiEyeOff {...props} />);
