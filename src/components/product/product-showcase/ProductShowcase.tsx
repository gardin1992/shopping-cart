import * as React from 'react'
import { toDecimal } from '../../../mask'

import { ReactComponent as IMoney } from '../../../assets/icons/i-money.svg';
import { ReactComponent as ICreditCard } from '../../../assets/icons/i-credit-card.svg';

import * as S from './styles'
import { IProduct } from '../../../interfaces';

interface IProductShowCase extends IProduct {
    addItemToCart: (product: IProduct) => void
}


function ProductShowcase(props: IProductShowCase) {
    const perDiscountPrice = props.price * 12 / 100
    const discountPrice = props.price - perDiscountPrice
    const amountPrice = props.price / 12

    const onClickItem = () => {
        props.addItemToCart({
            category: props.category,
            description: props.description,
            id: props.id,
            image: props.image,
            price: props.price,
            title: props.title,
        })

        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }

    return <S.CArticle onClick={onClickItem}>
        <S.CFigure>
            <figure>
                <img src={props.image} alt={props.title} title={props.title} />
            </figure>
        </S.CFigure>
        <div>
            <h4>{props.category}</h4>
            <h3>{props.title}</h3>
        </div>
        <div className="description">{props.description}</div>
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
                    <p>${toDecimal(props.price)}</p>
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