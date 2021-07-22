import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import ProductShoppingCart from "../components/product/product-shopping-cart";
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

const CButtonLabel = styled.label`
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


    display: FLEX;
    justify-content: center;
    align-items: center;
`


function ShoppingCart() {
    const stateItems = useSelector((state: { shoppingCart: IShoppingCart }) => state.shoppingCart.items)
    const history = useHistory()

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

    const closeShoppingCart = () => {
        dispatch(resetState())
        history.replace('/')
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

                <CButtonLabel htmlFor="modal-control">
                    Finalizar Pedido
                </CButtonLabel>
                <input type="checkbox" id="modal-control" className="modal" />

                <div>
                    <div className="card">
                        <label htmlFor="modal-control" className="modal-close" onClick={closeShoppingCart} ></label>
                        <h3 className="section">Obrigado!</h3>
                        <p className="section">Compra realizada com sucesso!</p>
                    </div>
                </div>
            </div>
        </CShoppingCart>
    </CShoppingCartContent>
}

export default ShoppingCart;