import * as React from 'react';

import { IShoppingCartItem } from '../../../interfaces';
import { toDecimal } from '../../../mask';

import { ReactComponent as ITrash } from '../../../assets/icons/i-trash.svg';
import { ReactComponent as IAdd } from '../../../assets/icons/i-add.svg';
import { ReactComponent as IRemove } from '../../../assets/icons/i-remove.svg';


import { CProductShoppingCart } from './styles';
import { useDispatch } from 'react-redux';
import { addItem, dropItem, removeItem } from '../../../reducers/shoppingCartSlicer';


function ProductShoppingCart(props: { product: IShoppingCartItem }) {

    const { title, price, image, amount } = props.product
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        setTotal(amount * price)
    }, [amount])

    const dispatch = useDispatch()

    return <CProductShoppingCart>
        <div className="content">
            <figure>
                <img src={image} alt={''} title={''} />
            </figure>

            <div >
                <h3>{title}</h3>
                <p>Valor Unitário</p>
                <p className="content-price">${toDecimal(price)}</p>
            </div>
            <span className="i-trash"><ITrash onClick={() => {
                dispatch(dropItem(props.product.id))
            }} /></span>
        </div>

        <div className="footer">
            <p>Quantidade</p>

            <div className="content-amount">
                <button className="btn-less" onClick={() => {
                    dispatch(removeItem(props.product)) 
                }}
                    disabled={props.product.amount <= 1}
                >
                    <span className="i-remove"><IRemove /></span>
                </button>

                <span className="amount">
                    {amount}
                </span>

                <button className="btn-more" onClick={() => {
                    dispatch(addItem(props.product))
                }}>
                    <span className="i-add"><IAdd /></span>
                </button>

            </div>

            <p>$ {toDecimal(total)}</p>
        </div>
    </CProductShoppingCart>
}

export default ProductShoppingCart;