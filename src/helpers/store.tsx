import addMinutes from 'date-fns/addMinutes'
import isPast from 'date-fns/isPast'

export const configs = {
    NAMESPACE: 'SC'
}

const expire = 'expire_'
const namespace = configs.NAMESPACE ? `${configs.NAMESPACE}_` : ''
const keyName = (key: string, prefix = '') => `${prefix}${namespace}${key}`

const getExpirationDate = (key: string) => {
    const exp = localStorage.getItem(keyName(key, expire))
    return new Date(exp || Number.MIN_VALUE)
}

const remove = (key: string) => {
    localStorage.removeItem(keyName(key, expire))
    localStorage.removeItem(keyName(key))
}

function set(key: string, data: any, expireMinutes = 1430) {
    const expireDate = addMinutes(new Date(), expireMinutes)
    localStorage.setItem(keyName(key, expire), expireDate.toISOString())
    localStorage.setItem(keyName(key), JSON.stringify(data))
}

function get(key: string) {
    const expiration = getExpirationDate(key)
    const value = localStorage.getItem(keyName(key))

    if (!value || isPast(expiration)) {
        remove(key)
        return undefined
    }

    return JSON.parse(value)
}

export const localStore = { set, get, remove }

export const sessionStore = {
    set: (key: string, data: any) => {
        sessionStorage.setItem(keyName(key), JSON.stringify(data))
    },
    get: (key: string) => {
        const value = sessionStorage.getItem(keyName(key))

        if (!value) {
            remove(key)
            return undefined
        }

        if (typeof value === 'string' && value === 'undefined') return undefined

        return JSON.parse(value)
    },
    remove: (key: string) => {
        sessionStorage.removeItem(keyName(key))
    },
}
