import { configureStore } from '@reduxjs/toolkit'

import shoppingCartSlicer from './reducers/shoppingCartSlicer'
import authenticationSlicer from './reducers/authenticationSlicer'

export default configureStore({
    reducer: {
        shoppingCart: shoppingCartSlicer,
        authentication: authenticationSlicer
    }
})