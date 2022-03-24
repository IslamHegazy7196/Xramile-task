import { toast } from "react-toastify";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "./actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount;
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      toast.success("Item is added to cart", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id,
        name: product.name,
        amount,
        image: product.featuredPhoto,
        price: product.price,
      };
      toast.success("Item is modified in cart");
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    toast.success("Item removed from cart", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    toast.success("Cart cleared", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          toast.success("Item is modified in cart");
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount > 0) {
            toast.success("Item is modified in cart");
          }
          if (newAmount < 1) {
            newAmount = 1;
          }
          
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
