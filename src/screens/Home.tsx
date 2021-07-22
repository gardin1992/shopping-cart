import * as React from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux'

import { addItem } from '../reducers/shoppingCartSlicer';

import styled from 'styled-components'

import Banner from "../components/banner";
import ProductShowcase from "../components/product/product-showcase/ProductShowcase";
import { IProduct } from "../interfaces";
import IndexedDbStore, {userSchema} from '../helpers/indexedDBStore'

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

    const indexDbStore = IndexedDbStore()
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
        if (!!indexDbStore.connection) {
            indexDbStore.insertData(userSchema.name, { ssn: "666-66-6666", nome: "John", idade: 29, email: "gardin1992@gmail.com" }, (e: any) => { }, (e: any) => {
                console.log('e', e.target.error)
            })
        }
    }, [indexDbStore.connection])

    const results = productList.length ?? 0;

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

