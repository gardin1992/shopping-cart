import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components'
import cx from 'classnames'
import { useDispatch, useSelector } from "react-redux";

import { theme } from '../../styles'
import { ReactComponent as IUser } from '../../assets/i-user.svg';
import { ReactComponent as IShoppingCart } from '../../assets/i-shopping-cart.svg';
import { ReactComponent as ILogout } from '../../assets/icons/i-logout.svg';
import { unauthorize } from "../../reducers/authenticationSlicer";


const CIcon = styled.a`
    svg {
        fill: ${theme.colors.secondary};
        width: 50px;
        height: 50px;
    }

    &.user {
        display: inline-flex;
        align-items: center;
        justify-content: space-between
    }
`

function Icon(props: { icon: React.ReactElement, onClick: () => void, children?: string | '', className?: string }) {
    return <CIcon href="#" className={cx(["button", props.className])} onClick={props.onClick}>
        {props.icon} {props.children}
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
    const history = useHistory()
    const dispatch = useDispatch()
    const auth = useSelector((state: { authentication: any }) => state.authentication)

    return <CHeader className="flex-center">
        <header className="flex-center">
            <Link to="/" className='link'>
                <a href="/" className="logo">Shopping Cart</a>
            </Link>

            <div>
                <Link to="/carrinho" className='link'>
                    <Icon onClick={() => { }} icon={<IShoppingCart />} />
                </Link>

                <Link to={!!auth?.isAuth ? '/' : '/usuario'} className='link'>
                    <Icon className="user" onClick={() => { }} icon={<IUser />}>
                        {!!auth?.isAuth ? auth.user?.name : 'Entrar'}
                    </Icon>
                </Link>

                {!!auth?.isAuth &&
                    <Icon onClick={() => {
                        dispatch(unauthorize())
                        history.push('/')
                    }} icon={<ILogout />} />
                }
            </div>
        </header>
    </CHeader>
}

export default Header;