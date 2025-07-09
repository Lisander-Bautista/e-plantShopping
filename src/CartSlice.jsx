import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],  // Cada ítem: { id, name, image, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Buscamos por nombre (idealmente usarías un 'id' único)
      const existing = state.items.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      // action.payload debe ser el name (o id) del ítem a eliminar
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Exportamos las acciones y el reducer
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;