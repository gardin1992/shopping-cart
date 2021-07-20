import React from 'react';

interface User {
  name: string;
  id: number;
}

interface IProduct {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  title: string,
}

class Product {
  title: string;
  id: number;

  constructor(title: string, id: number) {
    this.title = title;
    this.id = id;
  }
}

// const product: IProduct = new Product("Murphy", 1);

const requestApi = async (callback: (data: IProduct[]) => void) => {
  try {
    const res = await fetch('https://fakestoreapi.com/products/Silicon Power')
    const json: IProduct[] = await res.json()

    console.log(json)

    callback(json)
  } catch (err) {

    console.log(err)
  }
}

function App() {
  const [productList, setProductList] = React.useState<IProduct[]>([])

  React.useEffect(() => {
    requestApi(setProductList)
  }, [])

  React.useEffect(() => {

    console.log('productList', productList)
  }, [productList])

  return (
    <div>App</div>
  );
}

export default App;