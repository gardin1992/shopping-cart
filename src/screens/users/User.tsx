import * as React from 'react'

import { ReactComponent as IEmail } from '../../assets/icons/i-email.svg'
import { ReactComponent as IPassword } from '../../assets/icons/i-password.svg'
import { ReactComponent as IContact } from '../../assets/icons/i-contact.svg'

import ViaCepApi, { IViaCepResponseDTO } from '../../helpers/viaCepApi'

import * as S from './styles'
import { requiredField } from '../../helpers/strings'
import { IUserLogin, IUserRegister } from '../../interfaces/users'
import Input from '../../components/input'

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

function User() {

    const [userLogin, setUserLogin] = React.useState<IUserLogin>(initialUserLogin)
    const [userRegister, setUserRegister] = React.useState<IUserRegister>(initialUserRegister)
    const [userRegisterErrors, setUserRegisterErrors] = React.useState<IUserRegister>({})
    const [userLoginError, setUserLoginError] = React.useState<IUserLogin>({})

    const useViaCepApi = ViaCepApi()

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

        if (!userRegister.name) {
            setUserRegisterErrors(prev => ({ ...prev, name: requiredField }))
        } else {
            // setUserRegisterErrors(prev => ({ ...prev, name: "" }))
        }

        if (!userRegister.email) {
            setUserRegisterErrors(prev => ({ ...prev, email: requiredField }))
        } else {
            // setUserRegisterErrors(prev => ({ ...prev, email: "" }))
        }

        if (!userRegister.password || !userRegister.repassword) {
            setUserRegisterErrors(prev => ({ ...prev, password: "Senhas não são iguais" }))
        } else if (userRegister.password !== userRegister.repassword) {
            // setUserRegisterErrors(prev => ({ ...prev, password: "" }))
        }

        if (!userRegister.postalCode) {
            setUserRegisterErrors(prev => ({ ...prev, postalCode: requiredField }))
        } else {
            // setUserRegisterErrors(prev => ({ ...prev, postalCode: "" }))
        }

        if (!userRegister.streetName) {
            setUserRegisterErrors(prev => ({ ...prev, streetName: requiredField }))
        }

        if (!userRegister.streetNumber) {
            setUserRegisterErrors(prev => ({ ...prev, streetNumber: requiredField }))
        }

        if (!userRegister.city) {
            setUserRegisterErrors(prev => ({ ...prev, city: requiredField }))
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
        </div>

    </S.CUserContainer>
}


export default User