import styled from 'styled-components'
import Button from '../../components/button'
import { theme } from '../../styles'

export const CButton = styled(Button)`
    width: 393px;
    margin: 0 auto;
    display: block;
    margin-top: 40px;
`

export const CUserContainer = styled.div`
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
