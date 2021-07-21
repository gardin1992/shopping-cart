import { configureStore } from '@reduxjs/toolkit'
import shoppingCartSlicer from './reducers/shoppingCartSlicer'

export default configureStore({
    reducer: {
        shoppingCart: shoppingCartSlicer
    }
})