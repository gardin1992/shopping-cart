import * as React from 'react'
import { toDecimal } from '../../../mask'

import { ReactComponent as IMoney } from '../../../assets/icons/i-money.svg';
import { ReactComponent as ICreditCard } from '../../../assets/icons/i-credit-card.svg';

import { IProduct } from '../Product'

import * as S from './styles'


function ProductShowcase(product: IProduct) {
    const perDiscountPrice = product.price * 12 / 100
    const discountPrice = product.price - perDiscountPrice
    const amountPrice = product.price / 12

    return <S.CArticle>
        <S.CFigure>
            <figure>
                <img src={product.image} alt={product.title} title={product.title} />
            </figure>
        </S.CFigure>
        <div>
            <h4>{product.category}</h4>
            <h3>{product.title}</h3>
        </div>
        <div className="description">{product.description}</div>
        <div className="prices">
            <div className="content-price">
                <span className="icon">
                    <S.CIcon>
                        <IMoney />
                    </S.CIcon>
                </span>

                <span>
                    <p>à vista</p>
                    <p className='price'> ${toDecimal(discountPrice)}</p>
                    <p>12% desconto</p>
                </span>
            </div>
            <div className="content-price">
                <span className="icon">
                    <S.CIcon>
                        <ICreditCard />
                    </S.CIcon>
                </span>
                <span>
                    <p>${toDecimal(product.price)}</p>
                    <span className="price-center">
                        <p>12x de </p>
                        <p className='price'> ${toDecimal(amountPrice)}</p>
                    </span>
                    <p>sem juros</p>
                </span>
            </div>
        </div>
    </S.CArticle>
}


export default ProductShowcase