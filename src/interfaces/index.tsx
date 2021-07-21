/**
 * Products
 */
export interface IProduct {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string,
}

/**
 * ShoppingCart
 */
export interface IProductShoppingCart {
    amount: number,
    total: number,
    productTitle: string,
    productId: number,
    productPrice: number,
}

export interface IShoppingCart {
    items: IProduct[],
    totalAmount?: number,
}


/**
 * Purchases
 */
export interface IPurchase {
    items: IProductShoppingCart[],
    subTotal?: number,
    total?: number,
    paymentMethod?: string,
    discount?: number,
    totalAmount?: number
}


/**
 * Slicers
 */
