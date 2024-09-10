const {configureStore} = require('@reduxjs/toolkit');
import productReducer from './slices/ProductSlice';
import WishlistReducer from './slices/WishistSlice';
import CartReducer from './slices/CartSlice';
import AddressReducer from './slices/AddressSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: WishlistReducer,
    cart: CartReducer,
    address: AddressReducer,
  },
});
