import { configureStore } from '@reduxjs/toolkit'
import { IShoppingCart } from '../interfaces'

const initialState: IShoppingCart = {
    items: [],
    totalAmount: 0
}


const shoppingCartReducer = () => {


    return {

    }
}

const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer,
    }
})

export default store