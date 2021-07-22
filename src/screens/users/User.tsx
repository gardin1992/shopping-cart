import * as React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import { ReactComponent as IEmail } from '../../assets/icons/i-email.svg'
import { ReactComponent as IPassword } from '../../assets/icons/i-password.svg'
import { ReactComponent as IContact } from '../../assets/icons/i-contact.svg'

import ViaCepApi, { IViaCepResponseDTO } from '../../helpers/viaCepApi'

import * as S from './styles'
import { requiredField } from '../../helpers/strings'
import { IUserLogin, IUserRegister } from '../../interfaces/users'
import Input from '../../components/input'
import IndexedDbStore, { userSchema } from '../../helpers/indexedDBStore'
import { useHistory } from 'react-router'

const initialUserRegister: IUserRegister = {
    name: "",
    email: "",
    password: "",
    repassword: "",
    //
    postalCode: "",
    streetName: "",
    streetNumber: "",
    neighborhood: "",
    state: "",
    city: "",
}

const initialUserLogin = {
    email: "",
    password: ""
}

const InputBefore = styled.input`
 &::before {
    content: " ";
    font-family: sans-serif;
    font-size: calc(1rem + var(--universal-padding) / 2);
    top: calc(0rem - var(--universal-padding));
    left: calc(var(--universal-padding) / 4);
 }
`

const CModal = styled.div`
    &.content-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        background: #80808047;
        display: none;
    }

    &.show {
        display: flex !important;
    }

    .modal-close {
        position: absolute;
        right: 0;
        top: 0;
        margin: 0;
        padding: 5px;
        background: #fff;
    }
`

function User() {

    const [userLogin, setUserLogin] = React.useState<IUserLogin>(initialUserLogin)
    const [userRegister, setUserRegister] = React.useState<IUserRegister>(initialUserRegister)
    const [userRegisterErrors, setUserRegisterErrors] = React.useState<IUserRegister>({})
    const [userLoginError, setUserLoginError] = React.useState<IUserLogin>({})

    const useViaCepApi = ViaCepApi()
    const indexDbStore = IndexedDbStore()
    const history = useHistory()

    const [hasFetching, setHasFetching] = React.useState(false)

    const requestAddress = (postalCode: string) => {
        setHasFetching(true)

        useViaCepApi.getByPostalCode(postalCode)
            .then(resp => {
                if (!!resp) {
                    const data: IViaCepResponseDTO = resp
                    setUserRegister(prev => ({ ...prev, ...data }))
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setHasFetching(false)
            })
    }

    const sendUserRegister = () => {
        const errors: any = {}

        if (!userRegister.name) {
            errors.name = requiredField
        }

        if (!userRegister.email) {
            errors.email = requiredField
        }

        if (!userRegister.password || !userRegister.repassword) {
            errors.password = errors.repassword = requiredField
        } else if (userRegister.password !== userRegister.repassword) {
            errors.repassword = "Senhas não são iguais"
        }

        if (!userRegister.postalCode) {
            errors.postalCode = requiredField
        }

        if (!userRegister.streetName) {
            errors.streetName = requiredField
        }

        if (!userRegister.streetNumber) {
            errors.streetNumber = requiredField
        }

        if (!userRegister.city) {
            errors.city = requiredField
        }

        setUserRegisterErrors(errors)

        if (!Object.keys(errors).length) {
            handleRegisterUser()
        }
    }

    const sentUserLogin = () => {
        if (!userLogin.email) {
            setUserLoginError(prev => ({ ...prev, email: requiredField }))
        }

        if (!userLogin.password) {
            setUserLoginError(prev => ({ ...prev, password: requiredField }))
        }
    }

    const handleRegisterUser = () => {
        const onSuccess = (e: any) => {
            setShowModal(true)
        }

        const onError = (e: any) => {
            console.log('erro ao adicionar usuário', e.target.error);
        }

        if (!!indexDbStore.connection)
            indexDbStore.insertData(userSchema.name, userRegister, onSuccess, onError)
    }


    React.useEffect(() => {
        if (!!indexDbStore.connection) {
            indexDbStore.insertData(userSchema.name, { ssn: "666-66-6666", nome: "John", idade: 29, email: "gardin1992@gmail.com" }, (e: any) => { }, (e: any) => {
                console.log('e', e.target.error)
            })
        }
    }, [indexDbStore.connection])


    const [showModal, setShowModal] = React.useState(false)


    return <S.CUserContainer className='fluid'>

        <div>
            <h2>Já sou cliente</h2>

            <Input
                icon={<IEmail />}
                placeholder="Email"
                name="email"
                value={userLogin.email}
                onChange={(e: any) => {
                    setUserLogin(prev => ({ ...prev, email: e.target.value }))
                }}
                type="email"
                error={userLoginError?.email}
            />

            <Input
                icon={<IPassword />}
                placeholder="Senha"
                name="password"
                value={userLogin.password}
                onChange={(e: any) => {
                    setUserLogin(prev => ({ ...prev, password: e.target.value }))
                }}
                type="password"
                error={userLoginError.password}
            />

            <S.CButton onClick={sentUserLogin} className="btn-login">
                Acessar Conta
            </S.CButton>
        </div>

        <div>
            <h2>Criar Conta</h2>

            <Input
                icon={<IEmail />}
                placeholder="Email"
                name="email"
                value={userRegister.email}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, email: e.target.value }))
                }}
                type="email"
                error={userRegisterErrors.email}
            />

            <Input
                placeholder="Nome"
                name="name"
                value={userRegister.name}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, name: e.target.value }))
                }}
                type="text"
                error={userRegisterErrors.name}
            />

            <Input
                icon={<IPassword />}
                placeholder="Senha"
                name="password"
                value={userRegister.password}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, password: e.target.value }))
                }}
                type="password"
                error={userRegisterErrors.password}
            />

            <Input
                placeholder="Confirmar Senha"
                name="repassword"
                value={userRegister.repassword}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, repassword: e.target.value }))
                }}
                type="password"
            />
            <h3>Endereço</h3>

            <Input
                icon={<IContact />}
                placeholder="CEP"
                name="postalCode"
                value={userRegister.postalCode}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, postalCode: e.target.value }))

                    if (e.target.value?.length === 8) {
                        requestAddress(e.target.value)
                    }
                }}
                onBlur={(e: any) => {
                    requestAddress(userRegister.postalCode || "")
                }}
                type="text"
                error={userRegisterErrors.postalCode}
            />

            <Input
                placeholder="Logradouro"
                name="streetName"
                value={userRegister.streetName}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, streetName: e.target.value }))
                }}
                type="text"
                error={userRegisterErrors.streetName}
            />

            <Input
                placeholder="Número"
                name="streetNumber"
                value={userRegister.streetNumber}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, streetNumber: e.target.value }))
                }}
                type="text"
                error={userRegisterErrors.streetNumber}
            />

            <Input
                placeholder="Bairro"
                name="neighborhood"
                value={userRegister.neighborhood}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, neighborhood: e.target.value }))
                }}
                type="text"
                error={userRegisterErrors.neighborhood}
            />

            <Input
                placeholder="Cidade"
                name="city"
                value={userRegister.city}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, city: e.target.value }))
                }}
                type="text"
                error={userRegisterErrors.city}
            />

            <Input
                placeholder="UF"
                name="state"
                value={userRegister.state}
                onChange={(e: any) => {

                    if (e.target.value)
                        setUserRegister(prev => ({ ...prev, state: e.target.value }))
                }}
                type="text"
            />

            <S.CButton onClick={sendUserRegister} className="btn-login">
                Prosseguir
            </S.CButton>

            <CModal className={classNames(['content-modal'], { show: showModal })}>
                <div className="card">
                    <button className="modal-close" onClick={() => {
                        setShowModal(false)
                        history.push('/')
                    }}>x</button>
                    <h3 className="section">Obrigado!</h3>
                    <p className="section">Cadastro Efetuado com sucesso, você será redirecionado para a página inicial!</p>
                </div>
            </CModal>
        </div>

    </S.CUserContainer>
}


export default User