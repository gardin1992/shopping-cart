import { createSlice } from "@reduxjs/toolkit"
import { IProduct, IShoppingCart, IShoppingCartItem } from "../interfaces"


const initialState: IShoppingCart = {
    items: [],
    totalAmount: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {

            const has = state.items.some((i: IShoppingCartItem) => i.id === action.payload.id)

            if (!has) {
                action.payload.amount = 1
                state.items.push(action.payload)
            } else {
                const index = state.items.findIndex((i: IShoppingCartItem) => i.id === action.payload.id)
                state.items[index].amount++
            }
        },
        removeItem: (state, action) => {
            const has = state.items.some((i: IShoppingCartItem) => i.id === action.payload.id)

            if (has) {

                const index = state.items.findIndex((i: IShoppingCartItem) => i.id === action.payload.id)

                if (state.items[index].amount > 1)
                    state.items[index].amount--
            }
        },
        dropItem: (state, action) => {
            const items = state.items.filter((i: IProduct) => i.id !== action.payload)

            console.log('items', state.items)
            state.items = items
            console.log('items', state.items)
        }
    }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, dropItem } = counterSlice.actions

export default counterSlice.reducer