import * as React from 'react';
import styled from 'styled-components'
import { theme } from '../../styles';


const CButton = styled.button`
    height: 50px;

    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};

    &:hover {
        background-color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.white};
        color: ${theme.colors.white};
    }
`

function Button({
    className = 'Button',
    onClick,
    children,
}: {
    className: string,
    onClick: () => void,
    children: React.ReactElement
}) {
    return <CButton
        className={className}
        onClick={onClick}
    >
        {children}

    </CButton>
}


export default Button;