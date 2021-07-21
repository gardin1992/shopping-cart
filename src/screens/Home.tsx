import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'

import { addItem } from '../reducers/shoppingCartSlicer';



import styled from 'styled-components'

import Banner from "../components/banner";
import ProductShowcase from "../components/product/product-showcase/ProductShowcase";
import { IProduct, IShoppingCart } from "../interfaces";


const product: IProduct = {
    category: 'cadeira gamer',
    description: 'Espuma de encosto, espuma moldadaa a frio do assento',
    id: 3,
    image: '',
    price: 2045.34,
    title: 'Master Caliber 12'
}

const CShowcaseItems = styled.div`
gap: 50px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
`

function Home() {

    const [productList, setProductList] = React.useState<IProduct[]>([])

    const history = useHistory();


    const requestApi = async (callback: (data: IProduct[]) => void) => {
        try {
            const res = await fetch('https://fakestoreapi.com/products')
            const json: IProduct[] = await res.json()
            callback(json)
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        requestApi(setProductList)
    }, [])

    React.useEffect(() => {

        if (!!productList && productList?.length) {


        }

        console.log('productList', productList)
    }, [productList])


    // const shoppingCartState = useSelector((state: { shoppingCart: IShoppingCart }) => state.shoppingCart)

    const results = productList.length ?? 0;

    // const [shoppingCartItems, setShoppingCartItems] = React.useState<IProduct[]>([])

    const dispatch = useDispatch()

    const addItemToCart = (product: IProduct) => {
        dispatch(addItem(product))
        history.push('/carrinho')
    }


    return <div>
        <Banner />

        <div className="fluid">

            <div className='flex-center'>
                <span>{results} resultados</span>
                <h2>Produtos em Destaque</h2>

                <select>
                    <option>Maior Preço</option>
                </select>
            </div>

            <CShowcaseItems>
                {productList.map((item: IProduct, index: number) => <ProductShowcase
                    {...item}
                    key={`${index}-${product.id}`}
                    addItemToCart={addItemToCart}
                />)}
            </CShowcaseItems>
        </div>
    </div>
}


export default Home;

