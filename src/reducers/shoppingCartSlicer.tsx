import { createSlice } from "@reduxjs/toolkit"
import { IProduct, IShoppingCart } from "../interfaces"


const initialState: IShoppingCart = {
    items: [],
    totalAmount: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {

            const has = state.items.some((i: IProduct) => i.id === action.payload.id)

            console.log(state, action)

            if (!has) {
                state.items.push(action.payload)
            }

            console.log('state.items', state.items)
        },
        removeItem: (state, action) => {
            const items = state.items.filter((i: IProduct) => i.id === action.payload)
            state.items = items
        }
    }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = counterSlice.actions

export default counterSlice.reducer