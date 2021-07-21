import * as React from 'react';

import { IProduct } from '../../../interfaces';
import { toDecimal } from '../../../mask';
import Button from '../../button';

import { ReactComponent as ITrash } from '../../../assets/icons/i-trash.svg';
import { ReactComponent as IAdd } from '../../../assets/icons/i-add.svg';
import { ReactComponent as IRemove } from '../../../assets/icons/i-remove.svg';


import { CProductShoppingCart } from './styles';


function ProductShoppingCart(props: { product: IProduct }) {

    const { title, price, image } = props.product

    const [amount, setAmount] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        setTotal(amount * price)
    }, [amount])

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
            <span className="i-trash"><ITrash /></span>
        </div>

        <div className="footer">
            <p>Quantidade</p>

            <div className="content-amount">
                <button className="btn-less" onClick={() => {
                    setAmount(amount - 1)
                }}>
                    <span className="i-remove"><IRemove /></span>
                </button>

                <span className="amount">
                    {amount}
                </span>

                <button className="btn-more" onClick={() => {
                    setAmount(amount + 1)
                }}>
                    <span className="i-add"><IAdd /></span>
                </button>

            </div>

            <p>$ {toDecimal(total)}</p>
        </div>
    </CProductShoppingCart>
}

export default ProductShoppingCart;