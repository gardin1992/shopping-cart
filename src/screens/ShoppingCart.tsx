import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import ProductShoppingCart from "../components/product/product-shopping-cart";
import { IProduct, IProductShoppingCart, IPurchase, IShoppingCart } from "../interfaces";
import { toDecimal } from "../mask";
import { addItem, removeItem } from "../reducers/shoppingCartSlicer";
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


    const stateItems = useSelector((state: { shoppingCart: IShoppingCart }) => state.shoppingCart.items)

    const dispatch = useDispatch()

    React.useEffect(() => {
        console.log(stateItems)
    }, stateItems)

    return <CShoppingCartContent className="fluid">
        <CShoppingCart>
            <h2>Meu Carrinho</h2>

            <div>
                {stateItems.map((item: IProduct) => <ProductShoppingCart product={item} />)}
            </div>
        </CShoppingCart>

        <CShoppingCart className="purchase">
            <h2>Resumo da Compra</h2>

            <div>
                <div className="content-purchase">
                    <CPurchaseRow>
                        <h3>Sub-total ({purchase.totalAmount} itens)</h3>
                        <h4>${toDecimal(purchase.subTotal ?? 0)}</h4>
                    </CPurchaseRow>

                    <CPurchaseRow>
                        <h3>Desconto</h3>
                        <h4>${toDecimal(purchase.discount ?? 0)}</h4>
                    </CPurchaseRow>

                    <hr></hr>

                    <CPurchaseRow>
                        <h3>Total</h3>
                        <h4>${toDecimal(purchase.total ?? 0)}</h4>
                    </CPurchaseRow>
                </div>

                <CButton>
                    Finalizar Pedido
                </CButton>
            </div>
        </CShoppingCart>
    </CShoppingCartContent>
}

export default ShoppingCart;