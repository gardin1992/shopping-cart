import * as React from 'react'
import { Link, useParams } from 'react-router-dom';
import useIndexedStore from '../../hooks/useIndexedStore';
import { toDecimal } from '../../mask';

/*

Ao clicarmos no pedido dever ter a possibilidade de visualizar os detalhes (Itens, quantidades / subtotal e total geral), bem como os dados do cliente.
  - Demonstre uma boar organização do projeto, utilizando-se dos principios SOLID.

 */
function OrderDetailsScreen() {
    const indexedStore = useIndexedStore()

    let { id } = useParams<any>();

    const [order, setOrder] = React.useState<any>()

    const requestOrders = () => {
        const onSuccess = (e: any) => {
            setOrder(e.target.result)
        }

        const onError = (e: any) => {
            alert('Erro ao busca os detalhes pedido')
        }

        indexedStore.getDataById('purchases', parseInt(id), onSuccess, onError)
    }

    React.useEffect(() => {
        if (!!indexedStore.connection) {
            requestOrders()
        }
    }, [id, indexedStore.connection])


    React.useEffect(() => {
        console.log(order)
    }, [order])

    return <div className="fluid">

        <Link to="/pedidos">
            <a href="/pedidos">Voltar</a>
        </Link>

        <h2>Detalhes do pedido Ref.: {id}</h2>

        <p><strong>SubTotal</strong>: ${toDecimal(order?.subTotal)}</p>
        <p><strong>Desconto</strong>: ${toDecimal(order?.discount)}</p>
        <p><strong>Total Pago</strong>: ${toDecimal(order?.total)}</p>

        <h2>Detalhes do cliente</h2>

        <p><strong>Nome</strong>: {order?.user?.name}</p>
        <p><strong>CPF</strong>: {order?.user?.cpf}</p>

        <p>Endereço</p>
        <p><strong>CEP</strong>: {order?.user?.postalCode}</p>
        <p><strong>Logradouro</strong>: {order?.user?.streetName}</p>
        <p><strong>Número</strong>: {order?.user?.streetNumber}</p>
        <p><strong>Bairro</strong>: {order?.user?.neighborhood}</p>
        <p><strong>Cidade</strong>: {order?.user?.city}</p>
        <p><strong>UF</strong>: {order?.user?.state}</p>

        <h2>Items Comprados ({order?.amount} items)</h2>

        <table>
            {order?.products.map((product: any) => <tr>
                <td>{product.title}</td>
                <td>{product.amount}</td>
                <td>${toDecimal(product.price)}</td>
                <td>${toDecimal(product.price * product.amount)}</td>
            </tr>)}

        </table>
    </div>
}

export default OrderDetailsScreen