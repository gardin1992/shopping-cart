import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import ProductShoppingCart from "../components/product/product-shopping-cart";
import IndexedDbStore from "../helpers/indexedDBStore";
import { IShoppingCart, IShoppingCartItem } from "../interfaces";
import { toDecimal } from "../mask";
import { resetState } from "../reducers/shoppingCartSlicer";
import { theme } from "../styles";

const CShoppingCartContent = styled.div`
    display: flex;
    flex-direction: row;
`

const CShoppingCart = styled.div`
    flex: 0 0 576px;

    h2 {
        font-size: 18px;
        color: ${theme.colors.secondary};
        margin: 50px 0 30px;
    }

    &.purchase {
        margin-left: 100px;

        .content-purchase {
            border: 1px solid ${theme.colors.primary};
        }
    }
`

const CPurchaseRow = styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: space-between;

    h3, h4{
        font-size: 16px;
    }

    h3 {
        font-weight: 400;
        color: ${theme.colors.primary};
    }
    h4 {
        font-weight: bold;
        color: ${theme.colors.secondary};
    }

`

const CButton = styled.button`
    width: 100%;
    height: 60px;
    margin-top: 100px;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondary};
    color: ${theme.colors.secondary};

    &:hover {
        background: ${theme.colors.secondary};
        border: 1px solid ${theme.colors.white};
        color: ${theme.colors.white};
    }
`

function ShoppingCart() {
    const stateItems = useSelector((state: { shoppingCart: IShoppingCart }) => state.shoppingCart.items)
    const auth = useSelector((state: { authentication: any }) => state.authentication)

    const history = useHistory()
    const indexedStore = IndexedDbStore()

    const [sale, setSale] = React.useState({
        subTotal: 0,
        total: 0,
        amount: 0,
        discount: 0,
    })

    React.useEffect(() => {
        if (stateItems.length) {

            let reduced = stateItems.reduce((previosValue, currentValue) => {
                const _value = currentValue.price * currentValue.amount
                const _value1 = previosValue.price * previosValue.amount

                return {
                    ...currentValue,
                    price: _value + _value1,
                    amount: previosValue.amount + currentValue.amount
                }
            })
            const perDiscountPrice = reduced.price * 12 / 100

            setSale({
                subTotal: reduced.price,
                amount: reduced.amount,
                total: reduced.price - perDiscountPrice,
                discount: perDiscountPrice,
            })

        }
    }, stateItems)

    const dispatch = useDispatch()

    const handleSendPurchase = () => {
        const purchase = {
            userId: auth?.user.id,
            user: auth?.user,
            ...sale,
            products: stateItems
        }

        const onSuccess = (e: any) => {
            const resp = e.target.result

            if (!resp) {
                alert('Erro ao finalizar compra')
            } else {

                dispatch(resetState())
                history.push('/pedidos/confirmar')
            }
        }

        const onError = (e: any) => {
            console.log('erro criar compra', e.target.error);
        }

        indexedStore.insertData('purchases', purchase, onSuccess, onError)
    }

    return <CShoppingCartContent className="fluid">
        <CShoppingCart>
            <h2>Meu Carrinho</h2>

            <div>
                {stateItems.map((item: IShoppingCartItem) => <ProductShoppingCart product={item} />)}
            </div>
        </CShoppingCart>

        <CShoppingCart className="purchase">
            <h2>Resumo da Compra</h2>

            <div>
                <div className="content-purchase">
                    <CPurchaseRow>
                        <h3>Sub-total ({sale.amount} itens)</h3>
                        <h4>${toDecimal(sale.subTotal ?? 0)}</h4>
                    </CPurchaseRow>

                    <CPurchaseRow>
                        <h3>Desconto (12% à vista)</h3>
                        <h4>${toDecimal(sale.discount ?? 0)}</h4>
                    </CPurchaseRow>

                    <hr></hr>

                    <CPurchaseRow>
                        <h3>Total</h3>
                        <h4>${toDecimal(sale.total ?? 0)}</h4>
                    </CPurchaseRow>
                </div>

                <CButton onClick={handleSendPurchase}>
                    Finalizar Pedido
                </CButton>
            </div>
        </CShoppingCart>
    </CShoppingCartContent>
}

export default ShoppingCart;