import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import ProductShoppingCart from "../components/product/product-shopping-cart";
import { IProduct, IProductShoppingCart, IPurchase } from "../interfaces";
import { toDecimal } from "../mask";
import { decrement, increment } from "../reducers/shoppingCartSlicer";

function ShoppingCart() {
    const [product, setProduct] = React.useState<IProduct>({
        title: '',
        category: '',
        description: '',
        id: 0,
        price: 0,
        image: '',
    });

    const items: IProductShoppingCart[] = []

    const [purchase, setPurchase] = React.useState<IPurchase>({
        items: [],
        discount: 0,
        paymentMethod: 'money',
        subTotal: 0,
        total: 0,
        totalAmount: 0,
    })


    //

    const count = useSelector((state: { counter: { value: number } }) => state.counter.value)

    const dispatch = useDispatch()

    return <div>

        <div>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
        </div>

        <section>
            <h2>Meu Carrinho</h2>

            <div>
                <ProductShoppingCart product={product} />
            </div>
        </section>

        <section>
            <h2>Resumo da Compra</h2>

            <div>
                <span>
                    <h3>Sub-total ({purchase.totalAmount} itens)</h3>
                    <span>${toDecimal(purchase.subTotal ?? 0)}</span>
                </span>

                <span>
                    <h3>Desconto</h3>
                    <span>${toDecimal(purchase.discount ?? 0)}</span>
                </span>

                <hr></hr>

                <span>
                    <h3>Total</h3>
                    <span>${toDecimal(purchase.total ?? 0)}</span>
                </span>
            </div>

        </section>
    </div>
}

export default ShoppingCart;