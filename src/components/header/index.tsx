import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'

import { theme } from '../../styles'
import { ReactComponent as IUser } from '../../assets/i-user.svg';
import { ReactComponent as IShoppingCart } from '../../assets/i-shopping-cart.svg';

const CIcon = styled.a`
    svg {
        fill: ${theme.colors.secondary};
        width: 50px;
        height: 50px;
    }
`

function Icon(props: { icon: React.ReactElement, onClick: () => void }) {
    return <CIcon href="#" className="button" onClick={props.onClick}>
        {props.icon}
    </CIcon>
}

const CHeader = styled.div`
border-bottom-color: ${theme.colors.secondary};
border-bottom: 5px solid;
height: 70px;

header {
    width: 1070px;
    margin: 0 auto;
    border: none;

    a.logo {
        font-weight: bold;
        font-size: 36px;
    }
}
`

function Header() {
    return <CHeader className="flex-center">
        <header className="flex-center">
            <Link to="/" className='link'>
                <a href="#" className="logo">Shopping Cart</a>
            </Link>

            <div>
                <Link to="/carrinho" className='link'>
                    <Icon onClick={() => { }} icon={<IShoppingCart />} />
                </Link>

                <Link to="/usuario" className='link'>
                    <Icon onClick={() => { }} icon={<IUser />} />
                </Link>
            </div>
        </header>
    </CHeader>
}

export default Header;