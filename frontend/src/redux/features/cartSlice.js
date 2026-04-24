import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  original_total: 0,
  final_total: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtocart: (state, { payload }) => {
      const existingitem = state.items.find((item) => item.id == payload.id)
      if (existingitem) {
        existingitem.qty++
      }
      else {
        state.items.push(payload)
      }

      state.original_total += payload.original_price
      state.final_total += payload.final_price

      localStorage.setItem("cart", JSON.stringify(state))
    },
    emptyCart: (state) => {
      state.items.original_total = 0
      state.items.final_total = 0
      state.items = []

      localStorage.removeItem("cart")

    },
    qtyChange: (state, { payload }) => {
      const cartItem = state.items.find((item) => item.id == payload.id)
      if (!cartItem) return
      if (payload.flag == "inc") {
        cartItem.qty++
      }
      else {
        if (cartItem.qty > 1) {
          cartItem.qty--
        } else {
          state.items = state.items.filter((item) => item.id != payload.id)
        }
      }
      localStorage.setItem("cart", JSON.stringify(state))

    },
    lstocart: (state) => {
      const cartItem = JSON.parse(localStorage.getItem("cart"))
      if (cartItem) {
        state.items = cartItem.items
        state.final_total = Number(cartItem.final_price)
        state.original_total = Number(cartItem.original_price)
      }
      else {

      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addtocart, emptyCart, qtyChange, lstocart } = cartSlice.actions

export default cartSlice.reducer