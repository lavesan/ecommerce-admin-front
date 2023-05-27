import { forwardRef } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import {
  HiEye,
  HiEyeOff,
  HiGift,
  HiOutlineMenu,
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
export const AiOutlinePoweroffRef = forwardRef((props, ref) => (
  <AiOutlinePoweroff {...props} />
));
export const HiOutlineMenuRef = forwardRef((props, ref) => (
  <HiOutlineMenu {...props} />
));
