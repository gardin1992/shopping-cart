import * as React from 'react'
import classNames from 'classnames'

import { ReactComponent as IEmail } from '../../assets/icons/i-email.svg'
import { ReactComponent as IPassword } from '../../assets/icons/i-password.svg'
import { ReactComponent as IContact } from '../../assets/icons/i-contact.svg'

import * as S from './styles'
import { requiredField } from '../../helpers/strings'
import { IUserLogin, IUserRegister } from '../../interfaces/users'
import Input from '../../components/input'
import useIndexedStore, { userSchema } from '../../hooks/useIndexedStore'
import { useHistory } from 'react-router'

import { useDispatch } from 'react-redux'
import { authorize } from '../../reducers/authenticationSlicer'
import { CModal } from '../../components/modal'
import useViaCepApi, { IViaCepResponseDTO } from '../../hooks/useViaCepApi'

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
    const viaCepApi = useViaCepApi()
    const indexDbStore = useIndexedStore()
    const history = useHistory()

    const [userLogin, setUserLogin] = React.useState<IUserLogin>(initialUserLogin)
    const [userRegister, setUserRegister] = React.useState<IUserRegister>(initialUserRegister)
    const [userRegisterErrors, setUserRegisterErrors] = React.useState<IUserRegister>({})
    const [userLoginError, setUserLoginError] = React.useState<IUserLogin>({})


    const dispatch = useDispatch()

    const requestAddress = (postalCode: string) => {

        viaCepApi.getByPostalCode(postalCode)
            .then(resp => {
                if (!!resp) {
                    const data: IViaCepResponseDTO = resp
                    setUserRegister(prev => ({ ...prev, ...data }))
                }
            })
            .catch(err => {
                console.log(err)
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

        if (!userRegister.cpf) {
            errors.cpf = requiredField
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
        const errors: any = {}

        if (!userLogin.email) {
            errors.email = requiredField
        }

        if (!userLogin.password) {
            errors.password = requiredField
        }

        setUserLoginError(errors)

        if (!Object.keys(errors).length)
            handleUserLogin()
    }

    const handleUserLogin = () => {
        const onSuccess = (e: any) => {
            const user = e.target.result

            if (!!user && user.password === userLogin.password) {
                dispatch(authorize(user))
                history.push('/carrinho')
            } else
                alert('Usuário ou senha incorreto')
        }

        const onError = (e: any) => {
            alert(`Erro ao logar usuário ${e.target.error}`);
        }

        if (!!indexDbStore.connection)
            indexDbStore.getDataByIndex('users', 'email', userLogin.email, onSuccess, onError)
    }

    const handleRegisterUser = () => {
        const onSuccess = (e: any) => {
            setShowModal(true)
        }

        const onError = (e: any) => {
            alert(`Erro ao adicionar usuário ${e.target.error}`);
        }

        if (!!indexDbStore.connection)
            indexDbStore.insertData(userSchema.name, userRegister, onSuccess, onError)
    }

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
                placeholder="CPF"
                name="cpf"
                value={userRegister.cpf}
                onChange={(e: any) => {
                    setUserRegister(prev => ({ ...prev, cpf: e.target.value }))
                }}
                type="text"
                error={userRegisterErrors.cpf}
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