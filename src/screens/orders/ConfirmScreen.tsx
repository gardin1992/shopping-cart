import * as React from 'react'
import { Link } from 'react-router-dom'

function ConfirmScreen() {

    // recebe o ID do pedido e mostra as informações de valores
    return <div className="fluid">

        <h2>Pedido confirmado com sucesso!</h2>

        <Link to="/">
            <a href="/">Voltar</a>
        </Link>


    </div>
}

export default ConfirmScreen