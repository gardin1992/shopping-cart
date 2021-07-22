import * as React from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../../components/input'
import IndexedDbStore from '../../helpers/indexedDBStore'
import { toDecimal } from '../../mask'
import { theme } from '../../styles'


const CFilter = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
`

const CTitle = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    h2 {
        font-size: 18px;
        color: ${theme.colors.secondary};
    }
`

function OrderScreen() {
    const [items, setItems] = React.useState([])

    const indexedStore = IndexedDbStore()

    const [filter, setFilter] = React.useState({
        name: "",
        cpf: "",
        city: "",
    })


    const requestOrders = useCallback(() => {
        const onSuccess = (e: any) => {
            const result = e.target.result

            if (!!filter.name || !!filter.cpf || !!filter.city) {

                let filtered = result

                if (!!filter.name) {
                    const name = filter.name.toLocaleLowerCase()
                    filtered = filtered.filter((i: any) => i?.user?.name.toLocaleLowerCase().includes(name))
                }

                if (!!filter.cpf) {
                    const cpf = filter.cpf.toLocaleLowerCase()
                    filtered = filtered.filter((i: any) => i?.user?.cpf?.toLocaleLowerCase().includes(cpf))
                }

                if (!!filter.city) {
                    const city = filter.city.toLocaleLowerCase()
                    filtered = filtered.filter((i: any) => i?.user?.city.toLocaleLowerCase().includes(city))
                }

                setItems(filtered)
            } else {
                setItems(result)
            }
        }
        const onError = (e: any) => {
            console.log('erro ao buscar pedidos')
        }

        indexedStore.getAll('purchases', onSuccess, onError)
    }, [filter, indexedStore]) 

    React.useEffect(() => {
        if (!!indexedStore.connection) {
            requestOrders()
        }
    }, [requestOrders, indexedStore.connection])

    return <div className="fluid">

        <CTitle>
            <h2>Lista de Pedidos</h2>
        </CTitle>

        <CFilter>
            <Input
                name="name"
                placeholder="Nome"
                onChange={(e: any) => {
                    setFilter(prev => ({ ...prev, name: e.target.value }))
                }}
                value={filter.name}
                type="text"
            />

            <Input
                name="cpf"
                placeholder="CPF"
                onChange={(e: any) => {
                    setFilter(prev => ({ ...prev, cpf: e.target.value }))
                }}
                value={filter.cpf}
                type="text"
            />

            <Input
                name="city"
                placeholder="Cidade"
                onChange={(e: any) => {
                    setFilter(prev => ({ ...prev, city: e.target.value }))
                }}
                value={filter.city}
                type="text"
            />
        </CFilter>
        <table>
            <thead>
                <tr>
                    <th>Ref.</th>
                    <th>Total</th>
                    <th>Cliente</th>
                    <th>Cidade</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {items.map((item: any) => <tr>
                    <td data-label="Ref.">{item.id}</td>
                    <td data-label="Total">${toDecimal(item.total)}</td>
                    <td data-label="Cliente">{item.user?.name}</td>
                    <td data-label="Cidade">{item.user?.city}</td>
                    <td data-label="">
                        <Link to={`/pedido/${item?.id}`}>
                            <a href={`/pedido/${item?.id}`}>Detalhes</a>
                        </Link>
                    </td>
                </tr>)}
            </tbody>
        </table>


    </div>
}

export default OrderScreen