import { createSlice } from "@reduxjs/toolkit"
import { sessionStore } from "../helpers/store"

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuth: false,
        user: null,
    },
    reducers: {
        authorize: (state, action) => {
            state.isAuth = true
            state.user = action.payload

            const data = typeof state.user === 'string' ? state.user : JSON.stringify(state.user)
            sessionStore.set('user', data)
        },
        unauthorize: (state) => {
            state.isAuth = false
            state.user = null

            sessionStore.remove('user')
        },
        reAuthorize: (state) => {

            if (isAuthorize()) {
                const data = sessionStore.get('user')
                state.user = JSON.parse(data)
                state.isAuth = true
            }
        }
    }
})

export const isAuthorize = () => {
    const data = sessionStore.get('user')

    if (!!data) {
        return true;
    }

    return false;
}

// Action creators are generated for each case reducer function
export const { authorize, unauthorize, reAuthorize } = authenticationSlice.actions

export default authenticationSlice.reducer