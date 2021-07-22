import * as React from 'react'
import styled from 'styled-components'

import {ReactComponent as IEmail} from '../assets/icons/i-email.svg'
import {ReactComponent as IPassword} from '../assets/icons/i-password.svg'
import {ReactComponent as IContact} from '../assets/icons/i-contact.svg'

import { theme } from '../styles'
import Button from '../components/button'

const CButton = styled(Button)`
    width: 393px;
    margin: 0 auto;
    display: block;
    margin-top: 40px;
`

const CInputGroup = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    border-color: ${theme.colors.primary};
    width: 500px;
    margin-top: 10px;

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
        color: ${theme.colors.secondary};
    }

    .input-group {
        margin-left: 30px
    }
`

const CUserContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px !important;
    margin-bottom: 50px !important;

    h2 {
        font-size: 18px;
        color: ${theme.colors.secondary};
        margin-left: 70px;
        margin-bottom: 10px;
    }

    h3 {
        font-size: 16px;
        color: ${theme.colors.secondary};
        margin-left: 70px;
        margin-bottom: 10px;
        margin-top: 50px;
    }
`

function User() {

    return <CUserContainer className='fluid'>

        <div>
            <h2>Já sou cliente</h2>

            <CInputGroup>
                <span>
                    <span><IEmail /></span>
                </span>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" name="email" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span>
                    <span><IPassword /></span>
                </span>
                <div className="input-group">
                    <label>Senha</label>
                    <input type="password" placeholder="Senha" name="password" />
                </div>
            </CInputGroup>

            <CButton onClick={() => {}} className="btn-login">
                Acessar Conta
            </CButton>
        </div>

        <div>
            <h2>Criar Conta</h2>

            <CInputGroup>
                <span>
                    <span><IEmail /></span>
                </span>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" name="email" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span />
                <div className="input-group">
                    <label>Nome</label>
                    <input type="password" placeholder="Nome" name="name" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span>
                    <span><IPassword /></span>
                </span>
                <div className="input-group">
                    <label>Senha</label>
                    <input type="password" placeholder="Senha" name="password" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span />
                <div className="input-group">
                    <label>Confirmar Senha</label>
                    <input type="password" placeholder="Confirmar senha" name="repassword" />
                </div>
            </CInputGroup>

            <h3>Endereço</h3>

            <CInputGroup>
                <span>
                    <span><IContact /></span>
                </span>
                <div className="input-group">
                    <label>CEP</label>
                    <input type="text" placeholder="CEP" name="postalCode" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span />
                <div className="input-group">
                    <label>Logradouro</label>
                    <input type="text" placeholder="Logradouro" name="streetName" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span />
                <div className="input-group">
                    <label>Número</label>
                    <input type="text" placeholder="Número" name="streetNumber" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span />
                <div className="input-group">
                    <label>Bairro</label>
                    <input type="text" placeholder="Bairro" name="neighborhood" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span />
                <div className="input-group">
                    <label>Cidade</label>
                    <input type="text" placeholder="Cidade" name="city" />
                </div>
            </CInputGroup>

            <CInputGroup>
                <span />
                <div className="input-group">
                    <label>Estado</label>
                    <input type="text" placeholder="Estado" name="uf" />
                </div>
            </CInputGroup>

            <CButton onClick={() => {}} className="btn-login">
                Prosseguir
            </CButton>
        </div>

    </CUserContainer>
}


export default User