const {createSlice} = require('@reduxjs/toolkit');

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    addProduct(state, action) {
      state.data = action.payload;
    },
  },
});
export const {addProduct} = productSlice.actions;
export default productSlice.reducer;
