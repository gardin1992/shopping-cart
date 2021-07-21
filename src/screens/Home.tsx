import * as React from "react";
import styled from 'styled-components'
import Banner from "../components/banner";
import Product, { IProduct } from "../components/product/Product";
import ProductShowcase from "../components/product/product-showcase/ProductShowcase";

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

function Showcase({ items }: { items: IProduct[] }) {
    const results = items.length ?? 0;

    return <div className="fluid">

        <div className='flex-center'>
            <span>{results} resultados</span>
            <h2>Produtos em Destaque</h2>

            <select>
                <option>Maior Preço</option>
            </select>
        </div>

        <CShowcaseItems>
            {items.map((item: IProduct, index: number) => <ProductShowcase {...item} key={`${index}-${product.id}`} />)}
        </CShowcaseItems>

        <div>
            Paginação
        </div>
    </div>
}


function Home() {
    const [productList, setProductList] = React.useState<IProduct[]>([])

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

    return <div>
        <Banner />

        <Showcase items={productList} />
    </div>
}


export default Home;

