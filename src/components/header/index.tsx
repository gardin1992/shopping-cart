import * as React from "react";
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
            <a href="#" className="logo">Shopping Cart</a>
            <div>
                <Icon onClick={() => { }} icon={<IShoppingCart />} />
                <Icon onClick={() => { }} icon={<IUser />} />
            </div>
        </header>
    </CHeader>
}

export default Header;