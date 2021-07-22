import * as React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles'

export const CInputGroup = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    border-color: ${theme.colors.primary};
    width: 500px;
    margin-top: 15px;
    position relative;

    .input-error {
        position: absolute;
        left: 70px;
        bottom: -20px;
        font-size: 10px;
        color: ${theme.colors.danger}
    }

    > span {
        width: 24px;
    }
    

    svg {
        fill: ${theme.colors.primary};
    }

    label {
        display: none;
    }
    input {
        outline: none;
        border: none;
        font-size: 16px;
        color: ${theme.colors.black};
    }

    .input-group {
        margin-left: 30px
    }
`

interface IINput {
    icon?: React.ReactElement,
    placeholder: string,
    type: string,
    name: string,
    value?: string,
    error?: string,
    onChange: (e: any) => void,
    onBlur?: (e: any) => void
}

const Input = ({
    icon,
    placeholder,
    type = 'text',
    name,
    value,
    error,
    onChange,
    onBlur,
}: IINput) => {
    return <CInputGroup>
        {!!icon ? <span>
            <span>{icon}</span>
        </span> : <span />
        }

        <div className="input-group">
            <label>{placeholder}</label>
            <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} onBlur={onBlur} />

            {!!error && <span className="input-error">{error}</span>}
        </div>
    </CInputGroup>

}


export default Input