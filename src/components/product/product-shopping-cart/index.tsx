import * as React from 'react';
import styled from 'styled-components';
import { IProduct } from '../../../interfaces';
import { toDecimal } from '../../../mask';
import Button from '../../button';

const CProductShoppingCart = styled.article`
    width: 500px;
`;

function ProductShoppingCart(props: { product: IProduct }) {

    const { title, description, price } = props.product

    const [amount, setAmount] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        setTotal(amount * price)
    }, [amount])

    return <CProductShoppingCart>
        <div>
            <figure>
                <img src={''} alt={''} title={''} />
            </figure>

            <h3>{title}</h3>
            <p>{description}</p>

            <i>Remover</i>

            <p>Valor Unitário</p>
            <p>${toDecimal(price)}</p>
        </div>

        <div className="footer">
            <p>Quantidade</p>

            <span>
                <Button className="btn-less" onClick={() => {
                    setAmount(amount - 1)
                }}>
                    <i >Less</i>
                </Button>

                {amount}
                <Button className="btn-more" onClick={() => {
                    setAmount(amount + 1)
                }}>
                    <i >Plus</i>
                </Button>

            </span>

            <p>$ {toDecimal(total)}</p>
        </div>
    </CProductShoppingCart>
}

export default ProductShoppingCart;